package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/mastervectormaster/lottery/app/config"
)

// EndBlocker checks if the counter has reached the target 
// and finish the lottery if the condition is met
func (k Keeper) EndBlocker(ctx sdk.Context) {
	counter, found := k.GetTxCounter(ctx)

	// if counter is GTE 10, reset to 0
	if found && counter.Counter.GTE(sdk.NewInt(config.TxCount)) {
		k.SetTxCounter(ctx, types.TxCounter {Counter: sdk.NewInt(0)});
		// TODO: Payout
	}
}