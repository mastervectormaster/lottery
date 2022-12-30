package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgEnterLottery = "enter_lottery"

var _ sdk.Msg = &MsgEnterLottery{}

func NewMsgEnterLottery(creator string, fee string, bet string) *MsgEnterLottery {
	return &MsgEnterLottery{
		Creator: creator,
		Fee:     fee,
		Bet:     bet,
	}
}

func (msg *MsgEnterLottery) Route() string {
	return RouterKey
}

func (msg *MsgEnterLottery) Type() string {
	return TypeMsgEnterLottery
}

func (msg *MsgEnterLottery) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgEnterLottery) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgEnterLottery) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
