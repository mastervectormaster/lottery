# Lottery
**Lottery** is a Betting Game built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## How to use

### Install required packages and configurations

```
sudo apt update
sudo apt upgrade -y
sudo apt install build-essential jq -y
chmod +x init.sh
chmod +x bet.sh
chmod +x balance.sh
```
### Chain Build & Start

```
./init.sh
```
This will init and start chain with 20 clients with 500token

### Place bet

```
./bet.sh
```
This will place bet from 20 clients

### Query balances

```
./balance.sh
```
This will query balances of 20 clients