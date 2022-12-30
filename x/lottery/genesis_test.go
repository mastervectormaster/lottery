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

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.LotteryKeeper(t)
	lottery.InitGenesis(ctx, *k, genesisState)
	got := lottery.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
