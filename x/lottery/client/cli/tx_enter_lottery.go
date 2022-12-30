package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdEnterLottery() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "enter-lottery [fee] [bet]",
		Short: "Broadcast message enter-lottery",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argFee := args[0]
			argBet := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgEnterLottery(
				clientCtx.GetFromAddress().String(),
				argFee,
				argBet,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
