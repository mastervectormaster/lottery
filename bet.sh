#!/bin/bash
DENOM="token"
CLIENT_NUM=20

for (( i=1; i<=CLIENT_NUM; i++ ))
do
    echo -e "\n************       Client $i bet ${i}token     ********************\n"
    lotteryd tx lottery enter-lottery 5token ${i}token --from client$i --chain-id lottery-12345_1 --gas auto -y
done