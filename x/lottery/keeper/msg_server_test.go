package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/mastervectormaster/lottery/testutil/keeper"
	"github.com/mastervectormaster/lottery/x/lottery/keeper"
	"github.com/mastervectormaster/lottery/x/lottery/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.LotteryKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
