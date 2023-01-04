package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/mastervectormaster/lottery/app/constants"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	// "github.com/tendermint/tendermint/crypto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k msgServer) EnterLottery(goCtx context.Context, msg *types.MsgEnterLottery) (*types.MsgEnterLotteryResponse, error) {
	fmt.Println(msg.Creator)
	ctx := sdk.UnwrapSDKContext(goCtx)

	if msg == nil {
		return nil, status.Error(codes.InvalidArgument, "Invalid Request")
	}

	// convert into Coin types
	fee, err := sdk.ParseCoinNormalized(msg.Fee)
	if err != nil {
		panic(err)
	}
	bet, err := sdk.ParseCoinNormalized(msg.Bet)
	if err != nil {
		panic(err)
	}

	// check fee and bet size
	if fee.IsLT(constants.RequiredFee) {
		return nil, sdkerrors.Wrap(types.ErrInsufficientFee, "Insufficient Fee")
	}
	if bet.IsLT(constants.MinBetSize) {
		return nil, sdkerrors.Wrap(types.ErrInsufficientBetSize, "Insufficient Bet Size")
	}
	if constants.MaxBetSize.IsLT(bet) {
		return nil, sdkerrors.Wrap(types.ErrInsufficientBetSize, "Exceeds Max Bet Size")
	}

	// increment counter
	counter, found := k.GetTxCounter(ctx)
	var incrementedCounter sdk.Int
	if !found {
		// Counter is set to 1 when first tx comes in
		incrementedCounter = sdk.OneInt()
	} else {
		// increment counter when the Enter Lottery Tx comes in
		incrementedCounter = counter.Counter.Add(sdk.NewInt(1))
	}

	k.SetTxCounter(ctx, types.TxCounter{Counter: incrementedCounter})

	// add to user list
	// only add when the user is not in the list
	k.AppendUser(ctx, types.User{User: msg.Creator})

	k.SetBet(ctx, types.Bet {
		Index: msg.Creator,
		User: msg.Creator,
		Data: string(msg.GetSignBytes()),
	})

	// send fee+bet to lottery pool
	// totalFee := sdk.NewCoins(fee.Add(bet))
	// lotteryPool := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
	// fmt.Println(msg.Creator)
	// fmt.Println(k.bankKeeper.GetAllBalances(ctx, sdk.AccAddress(msg.Creator)))
	// sdkError := k.bankKeeper.SendCoins(ctx, sdk.AccAddress(msg.Creator), lotteryPool, totalFee)
	// if sdkError != nil {
	// 	return nil, sdkError
	// }

	return &types.MsgEnterLotteryResponse{}, nil
}
