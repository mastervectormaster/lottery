package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

// GetUserCount get the total number of user
func (k Keeper) GetUserCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetUserCount set the total number of user
func (k Keeper) SetUserCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendUser appends a user in the store with a new id and update the count
// only add when the user is not in the list
func (k Keeper) AppendUser(
	ctx sdk.Context,
	user types.User,
) uint64 {
	count := k.GetUserCount(ctx)

	found := k.UserContains(ctx, user.User)

	if !found {
		// Set the ID of the appended value
		user.Id = count

		store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
		appendedValue := k.cdc.MustMarshal(&user)
		store.Set(GetUserIDBytes(user.Id), appendedValue)

		// Update user count
		k.SetUserCount(ctx, count+1)
	}
	return count
}

// SetUser set a specific user in the store
func (k Keeper) SetUser(ctx sdk.Context, user types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := k.cdc.MustMarshal(&user)
	store.Set(GetUserIDBytes(user.Id), b)
}

// GetUser returns a user from its id
func (k Keeper) GetUser(ctx sdk.Context, id uint64) (val types.User, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := store.Get(GetUserIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveUser removes a user from the store
func (k Keeper) RemoveUser(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	store.Delete(GetUserIDBytes(id))
}

// RemoveAllUser empty out the store
func (k Keeper) RemoveAllUserWithBet(ctx sdk.Context) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	allUsers := k.GetAllUser(ctx)
	for _, user := range allUsers {
		k.RemoveBet(ctx, user.User)
		store.Delete(GetUserIDBytes(user.Id))
	}
	k.SetUserCount(ctx, 0)
}

// GetAllUser returns all user
func (k Keeper) GetAllUser(ctx sdk.Context) (list []types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.User
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetUserIDBytes returns the byte representation of the ID
func GetUserIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetUserIDFromBytes returns ID in uint64 format from a byte array
func GetUserIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}

// Return true if the account address (string type) is included in the user list
func (k Keeper) UserContains(ctx sdk.Context, addr string) (found bool){
	allUsers := k.GetAllUser(ctx)
	found = false
	for _, _user := range allUsers {
		if _user.User == addr {
			found = true
			break
		}
	}
	return
}