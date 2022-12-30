package main

import (
	"os"
	
	sdk "github.com/cosmos/cosmos-sdk/types"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/ignite/cli/ignite/pkg/cosmoscmd"
	"github.com/mastervectormaster/lottery/app"
	lotteryCfg "github.com/mastervectormaster/lottery/app/config"
)

func main() {
	config := sdk.GetConfig()
	lotteryCfg.SetBech32Prefixes(config)

	rootCmd, _ := cosmoscmd.NewRootCmd(
		app.Name,
		app.AccountAddressPrefix,
		app.DefaultNodeHome,
		app.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)
	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}
