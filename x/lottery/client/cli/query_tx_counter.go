package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/spf13/cobra"
)

func CmdShowTxCounter() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-tx-counter",
		Short: "shows txCounter",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetTxCounterRequest{}

			res, err := queryClient.TxCounter(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
