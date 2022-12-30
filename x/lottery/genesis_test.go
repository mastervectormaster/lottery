package lottery_test

import (
	"testing"

	keepertest "github.com/mastervectormaster/lottery/testutil/keeper"
	"github.com/mastervectormaster/lottery/testutil/nullify"
	"github.com/mastervectormaster/lottery/x/lottery"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		TxCounter: &types.TxCounter{
			Counter: "77",
		},
		UserList: []types.User{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		UserCount: 2,
		BetList: []types.Bet{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.LotteryKeeper(t)
	lottery.InitGenesis(ctx, *k, genesisState)
	got := lottery.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.TxCounter, got.TxCounter)
	require.ElementsMatch(t, genesisState.UserList, got.UserList)
	require.Equal(t, genesisState.UserCount, got.UserCount)
	require.ElementsMatch(t, genesisState.BetList, got.BetList)
	// this line is used by starport scaffolding # genesis/test/assert
}
