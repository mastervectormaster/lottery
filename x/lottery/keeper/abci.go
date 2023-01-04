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
	proposerAddr := ctx.BlockHeader().ProposerAddress;

	// if the Block Proposer is included in the user list, skip block
	if k.UserContains(ctx, sdk.AccAddress(proposerAddr).String()) {
		return
	}
	
	// if counter is GTE 10, wrap up
	if found && counter.Counter.GTE(sdk.NewInt(constants.TxCount)) {
		// Payout
		k.Payout(ctx)

		// Reset
		k.SetTxCounter(ctx, types.TxCounter{Counter: sdk.NewInt(0)})
		k.RemoveAllUserWithBet(ctx)
	}
}
