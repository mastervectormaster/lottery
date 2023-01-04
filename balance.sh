#!/bin/bash
DENOM="token"
CLIENT_NUM=20

for (( i=1; i<=CLIENT_NUM; i++ ))
do
    echo -e "\n************       Client $i balance     ********************\n"
    lotteryd q bank balances $(lotteryd keys show client$i -a)
done