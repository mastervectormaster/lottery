package constants

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

const TxCount = 3

var (
	RequiredFee, _	= sdk.ParseCoinNormalized("5token")
	MinBetSize, _ 	= sdk.ParseCoinNormalized("1token")
	MaxBetSize, _ 	= sdk.ParseCoinNormalized("100token")
)