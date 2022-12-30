package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/lottery module sentinel errors
var (
	ErrInsufficientFee     = sdkerrors.Register(ModuleName, 10001, "Insufficient Fee")
	ErrInsufficientBetSize = sdkerrors.Register(ModuleName, 10002, "Insufficient Bet Size")
	ErrCounterNotFound     = sdkerrors.Register(ModuleName, 10003, "Counter not found")
)
