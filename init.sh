#!/bin/bash

# sudo apt update
# sudo apt upgrade -y
# sudo apt install build-essential jq -y

DENOM="token"
CHAIN_ID="lottery-12345_1"
KEYRING_BACKEND="test"
BLOCK_TIME="5m0s"
MONIKER="localtestnet"
CLIENT_NUM=20
INITIAL_TOKEN_AMOUNT=500


sudo rm -rf ~/.lottery
make install

lotteryd init $MONIKER --chain-id $CHAIN_ID

lotteryd config keyring-backend $KEYRING_BACKEND

# Change parameter token denominations to token
cat $HOME/.lottery/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="'$DENOM'"' > $HOME/.lottery/config/tmp_genesis.json && mv $HOME/.lottery/config/tmp_genesis.json $HOME/.lottery/config/genesis.json
cat $HOME/.lottery/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="'$DENOM'"' > $HOME/.lottery/config/tmp_genesis.json && mv $HOME/.lottery/config/tmp_genesis.json $HOME/.lottery/config/genesis.json
cat $HOME/.lottery/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="'$DENOM'"' > $HOME/.lottery/config/tmp_genesis.json && mv $HOME/.lottery/config/tmp_genesis.json $HOME/.lottery/config/genesis.json
cat $HOME/.lottery/config/genesis.json | jq '.app_state["evm"]["params"]["evm_denom"]="'$DENOM'"' > $HOME/.lottery/config/tmp_genesis.json && mv $HOME/.lottery/config/tmp_genesis.json $HOME/.lottery/config/genesis.json
cat $HOME/.lottery/config/genesis.json | jq '.app_state["inflation"]["params"]["mint_denom"]="'$DENOM'"'> $HOME/.lottery/config/tmp_genesis.json && mv $HOME/.lottery/config/tmp_genesis.json $HOME/.lottery/config/genesis.json

# Change block time (5min per block)
sed -i 's/timeout_commit = "5s"/timeout_commit = "'${BLOCK_TIME}'"/g' $HOME/.lottery/config/config.toml

lotteryd keys add validator

lotteryd add-genesis-account $(lotteryd keys show validator -a) 1000000000token

for (( i=1; i<=CLIENT_NUM; i++ ))
do
    echo "Creating Client $i"
    lotteryd keys add "client$i" 
    lotteryd add-genesis-account $(lotteryd keys show "client$i" -a ) ${INITIAL_TOKEN_AMOUNT}${DENOM}
done

lotteryd gentx validator 50000000token --chain-id $CHAIN_ID

lotteryd collect-gentxs

lotteryd start --pruning=nothing --log_level info