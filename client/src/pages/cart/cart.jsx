import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Table } from "semantic-ui-react";
import CartItem from "../../components/cart-item/cart-item";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: null, cartKeys: null, message: "Loading" };
  }

  setCart = cart => {
    const cartKeys = Object.keys(cart);
    let message;

    if (cartKeys.length === 0) {
      message = "Your cart is currently empty.";
      this.setState({ cart, cartKeys, message });
    } else {
      message = null;
      this.setState({ cart, cartKeys, message });
    }
  };

  componentDidMount() {
    handleFetch("/shop/cart").then(cart => this.setCart(cart));
  }

  handleClick = e => {
    const { id, qty } = e.target.dataset;
    const newQty = Number(qty);

    handleFetch("/shop/cart/update", { id, newQty }).then(cart =>
      this.setCart(cart)
    );
  };

  render() {
    const { cart, cartKeys, message } = this.state;

    return (
      <Table>
        <Table.Body>
          {!cartKeys || cartKeys.length === 0 ? (
            <h1>{message}</h1>
          ) : (
            cartKeys.map((cartKey, idx) => (
              <CartItem
                key={idx}
                id={cartKey}
                item={cart[cartKey]}
                handleClick={this.handleClick}
              />
            ))
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default CartPage;
