# sudo apt update
# sudo apt upgrade -y
# sudo apt install build-essential jq -y

sudo rm -rf ~/.lottery
make install

lotteryd init localtestnet --chain-id lottery-12345_1 

echo "claim either tribe mercy genre drastic stamp spring attend ready believe material hedgehog space remind valley give slight cram arm release universe hybrid abuse" | lotteryd keys add validator1 --keyring-backend test --recover

lotteryd add-genesis-account $(lotteryd keys show validator1 -a --keyring-backend test) 1000000000token 

echo "require resist steak energy armed prison embody abuse huge submit host subway merit kiwi inherit distance cliff suffer general program connect link employ crew" | lotteryd keys add account1 --keyring-backend test --recover

lotteryd add-genesis-account $(lotteryd keys show account1 -a --keyring-backend test) 200000token

lotteryd gentx validator1 50000000token --keyring-backend test --chain-id lottery-12345_1

lotteryd collect-gentxs

sed -i 's/stake/token/g' ~/.lottery/config/genesis.json

lotteryd start