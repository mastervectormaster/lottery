package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/mastervectormaster/lottery/testutil/keeper"
	"github.com/mastervectormaster/lottery/testutil/nullify"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

func TestTxCounterQuery(t *testing.T) {
	keeper, ctx := keepertest.LotteryKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	item := createTestTxCounter(keeper, ctx)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetTxCounterRequest
		response *types.QueryGetTxCounterResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetTxCounterRequest{},
			response: &types.QueryGetTxCounterResponse{TxCounter: item},
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.TxCounter(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}
