package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// EndBlocker checks if the counter has reached the target
// and finish the lottery if the condition is met
func (k Keeper) Payout(ctx sdk.Context) {
	
}
