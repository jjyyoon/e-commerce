import React from "react";
import { NavLink } from "react-router-dom";
import { MenuItem, Popup, Label, Icon } from "semantic-ui-react";

const CartMenu = ({ cartInfo }) => {
  if (!cartInfo) {
    return (
      <MenuItem>
        <Popup trigger={<Icon name="cart" />} content="Please sign in to view your cart." basic />
      </MenuItem>
    );
  }

  const { cart, cartKeys } = cartInfo;
  let totalQty = 0;

  if (cartKeys.length !== 0) {
    cartKeys.forEach((cartKey) => {
      totalQty = totalQty + cart[cartKey].quantity;
    });
  }

  return (
    <MenuItem as={NavLink} to="/cart">
      <Icon name="cart" />
      <Label circular floating color="red" size="mini">
        {totalQty}
      </Label>
    </MenuItem>
  );
};

export default CartMenu;
