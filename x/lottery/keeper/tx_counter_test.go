package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "github.com/mastervectormaster/lottery/testutil/keeper"
	"github.com/mastervectormaster/lottery/testutil/nullify"
	"github.com/mastervectormaster/lottery/x/lottery/keeper"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

func createTestTxCounter(keeper *keeper.Keeper, ctx sdk.Context) types.TxCounter {
	item := types.TxCounter{}
	keeper.SetTxCounter(ctx, item)
	return item
}

func TestTxCounterGet(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	item := createTestTxCounter(keeper, ctx)
	rst, found := keeper.GetTxCounter(ctx)
	require.True(t, found)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}

func TestTxCounterRemove(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	createTestTxCounter(keeper, ctx)
	keeper.RemoveTxCounter(ctx)
	_, found := keeper.GetTxCounter(ctx)
	require.False(t, found)
}
