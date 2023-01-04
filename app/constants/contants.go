package constants

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	TxCount     = 3
	RequiredFee, _ = sdk.ParseCoinNormalized("5token")
	MinBetSize, _  = sdk.ParseCoinNormalized("1token")
	MaxBetSize, _  = sdk.ParseCoinNormalized("100token")
)