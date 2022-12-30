package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

// SetTxCounter set txCounter in the store
func (k Keeper) SetTxCounter(ctx sdk.Context, txCounter types.TxCounter) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TxCounterKey))
	b := k.cdc.MustMarshal(&txCounter)
	store.Set([]byte{0}, b)
}

// GetTxCounter returns txCounter
func (k Keeper) GetTxCounter(ctx sdk.Context) (val types.TxCounter, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TxCounterKey))

	b := store.Get([]byte{0})
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveTxCounter removes txCounter from the store
func (k Keeper) RemoveTxCounter(ctx sdk.Context) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.TxCounterKey))
	store.Delete([]byte{0})
}
