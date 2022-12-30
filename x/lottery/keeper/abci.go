package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mastervectormaster/lottery/app/constants"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

// EndBlocker checks if the counter has reached the target
// and finish the lottery if the condition is met
func (k Keeper) EndBlocker(ctx sdk.Context) {
	counter, found := k.GetTxCounter(ctx)
	
	// if counter is GTE 10, reset to 0
	if found && counter.Counter.GTE(sdk.NewInt(constants.TxCount)) {
		// TODO: Payout
		k.Payout(ctx)

		// Reset
		k.SetTxCounter(ctx, types.TxCounter{Counter: sdk.NewInt(0)})
		k.RemoveAllUserWithBet(ctx)
	}
}
