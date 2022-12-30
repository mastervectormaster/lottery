package types_test

import (
	"testing"

	"github.com/mastervectormaster/lottery/x/lottery/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{

				TxCounter: &types.TxCounter{
					Counter: "28",
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
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated user",
			genState: &types.GenesisState{
				UserList: []types.User{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid user count",
			genState: &types.GenesisState{
				UserList: []types.User{
					{
						Id: 1,
					},
				},
				UserCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated bet",
			genState: &types.GenesisState{
				BetList: []types.Bet{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
