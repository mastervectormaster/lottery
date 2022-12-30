package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		TxCounter: nil,
		UserList:  []User{},
		BetList:   []Bet{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in user
	userIdMap := make(map[uint64]bool)
	userCount := gs.GetUserCount()
	for _, elem := range gs.UserList {
		if _, ok := userIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for user")
		}
		if elem.Id >= userCount {
			return fmt.Errorf("user id should be lower or equal than the last id")
		}
		userIdMap[elem.Id] = true
	}
	// Check for duplicated index in bet
	betIndexMap := make(map[string]struct{})

	for _, elem := range gs.BetList {
		index := string(BetKey(elem.Index))
		if _, ok := betIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for bet")
		}
		betIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
