package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/mastervectormaster/lottery/app/config"
)

func (k msgServer) EnterLottery(goCtx context.Context, msg *types.MsgEnterLottery) (*types.MsgEnterLotteryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if msg == nil {
		return nil, status.Error(codes.InvalidArgument, "Invalid Request")
	}

	// convert into Coin types
	fee, err := sdk.ParseCoinNormalized(msg.Fee);
    if err != nil {
        panic(err)
    }
	bet, err := sdk.ParseCoinNormalized(msg.Bet);
    if err != nil {
        panic(err)
    }
	requiredFee, err := sdk.ParseCoinNormalized(config.RequiredFee);
	if err != nil {
        panic(err)
    }
	minBet, err := sdk.ParseCoinNormalized(config.MinBetSize);
	if err != nil {
        panic(err)
    }

	// check fee and bet size
	if fee.IsLT(requiredFee) {
		return nil, sdkerrors.Wrap(types.ErrInsufficientFee, "Insufficient Fee");
	}
	if bet.IsLT(minBet) {
		return nil, sdkerrors.Wrap(types.ErrInsufficientBetSize, "Insufficient Bet Size");
	}

	counter, found := k.GetTxCounter(ctx)
	if !found {
		// Counter is set to 1 when first tx comes in
		k.SetTxCounter(ctx, types.TxCounter {Counter: sdk.OneInt()});
		return &types.MsgEnterLotteryResponse{}, nil
	}

	// increment counter when the Enter Lottery Tx comes in
	incrementedCounter := counter.Counter.Add(sdk.NewInt(1));
	k.SetTxCounter(ctx, types.TxCounter {Counter: incrementedCounter});

	return &types.MsgEnterLotteryResponse{}, nil
}
