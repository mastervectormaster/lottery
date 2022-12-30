package cli_test

import (
	"fmt"
	"testing"

	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	"github.com/stretchr/testify/require"
	tmcli "github.com/tendermint/tendermint/libs/cli"
	"google.golang.org/grpc/status"

	"github.com/mastervectormaster/lottery/testutil/network"
	"github.com/mastervectormaster/lottery/testutil/nullify"
	"github.com/mastervectormaster/lottery/x/lottery/client/cli"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

func networkWithTxCounterObjects(t *testing.T) (*network.Network, types.TxCounter) {
	t.Helper()
	cfg := network.DefaultConfig()
	state := types.GenesisState{}
	require.NoError(t, cfg.Codec.UnmarshalJSON(cfg.GenesisState[types.ModuleName], &state))

	txCounter := &types.TxCounter{}
	nullify.Fill(&txCounter)
	state.TxCounter = txCounter
	buf, err := cfg.Codec.MarshalJSON(&state)
	require.NoError(t, err)
	cfg.GenesisState[types.ModuleName] = buf
	return network.New(t, cfg), *state.TxCounter
}

func TestShowTxCounter(t *testing.T) {
	net, obj := networkWithTxCounterObjects(t)

	ctx := net.Validators[0].ClientCtx
	common := []string{
		fmt.Sprintf("--%s=json", tmcli.OutputFlag),
	}
	for _, tc := range []struct {
		desc string
		args []string
		err  error
		obj  types.TxCounter
	}{
		{
			desc: "get",
			args: common,
			obj:  obj,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			var args []string
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdShowTxCounter(), args)
			if tc.err != nil {
				stat, ok := status.FromError(tc.err)
				require.True(t, ok)
				require.ErrorIs(t, stat.Err(), tc.err)
			} else {
				require.NoError(t, err)
				var resp types.QueryGetTxCounterResponse
				require.NoError(t, net.Config.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.NotNil(t, resp.TxCounter)
				require.Equal(t,
					nullify.Fill(&tc.obj),
					nullify.Fill(&resp.TxCounter),
				)
			}
		})
	}
}
