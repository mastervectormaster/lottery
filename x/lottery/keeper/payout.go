package keeper

import (
	"crypto/sha256"
	"encoding/json"

	"github.com/tendermint/tendermint/crypto"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

// Payout to Winner
func (k Keeper) Payout(ctx sdk.Context) error {
	winnerIdx, err := k.ChooseWinnerIndex(ctx)
	if err != nil {
		return err
	}
	winner, found := k.GetUser(ctx, winnerIdx);
	if !found {
		return sdkerrors.Wrap(types.ErrCounterNotFound, "Counter not found")
	}
	winnerBet, _ := k.GetBet(ctx, winner.User)
	winnerLotteryData := unmarshalLotteryData(winnerBet.Data)

	winnerBetSize, _ := sdk.ParseCoinNormalized(winnerLotteryData.Bet)

	allBets := k.GetAllBet(ctx)
	isMax := true
	isMin := true
	totalBet, _ := sdk.ParseCoinNormalized("0token")
	for _, bet := range allBets {
		lotteryData := unmarshalLotteryData(bet.Data)
		// already checked for errors
		betSize, _:= sdk.ParseCoinNormalized(lotteryData.Bet)
		totalBet = totalBet.Add(betSize)
		if winnerBetSize.IsLT(betSize) {
			isMax = false
		}
		if betSize.IsLT(winnerBetSize) {
			isMin = false
		}
	}
	if !isMin {
		lotteryPool := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
		if isMax {
			// entire pool is sent to the winner
			poolAmount := k.bankKeeper.GetAllBalances(ctx, lotteryPool)
			err := k.bankKeeper.SendCoins(ctx, lotteryPool, sdk.AccAddress(winner.User), poolAmount)
			if err != nil {
				return err
			}
		} else {
			// send sum of bets to the winner
			err := k.bankKeeper.SendCoins(ctx, lotteryPool, sdk.AccAddress(winner.User), sdk.NewCoins(totalBet))
			if err != nil {
				return err
			}
		}
	}
	return nil;
}

// Choose Winner
func (k Keeper) ChooseWinnerIndex(ctx sdk.Context) (uint64, error) {
	counter, found := k.GetTxCounter(ctx)
	if !found {
		return ^uint64(0), sdkerrors.Wrap(types.ErrCounterNotFound, "Counter not found")
	}
	allUsers := k.GetAllUser(ctx)
	concatenDataStr := "";
	for _, user := range allUsers {
		bet, found := k.GetBet(ctx, user.User)
		if !found {
			return ^uint64(0), sdkerrors.Wrap(types.ErrCounterNotFound, "Counter not found")
		}
		concatenDataStr += bet.Data
	}
	digest := sha256.Sum256([]byte(concatenDataStr))

	return (uint64(digest[30]) << 8 + uint64(digest[31])) % counter.Counter.Uint64(), nil
}

func unmarshalLotteryData(data string) *types.MsgEnterLottery {
	var lotteryData types.MsgEnterLottery
	json.Unmarshal([]byte(data), &lotteryData)
	return &lotteryData
}