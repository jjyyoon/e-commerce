import React from "react";
import { handleFetch } from "../../handle-fetch";

import { Table } from "semantic-ui-react";
import CartItem from "../../components/cart-item/cart-item";

class CartPage extends React.Component {
  componentDidMount() {
    const { history, cartInfo } = this.props;

    if (!cartInfo) {
      alert("Please sign in to view this page.");
      history.push("/");
    }
  }

  handleClick = (e) => {
    const { setCart } = this.props;
    const { id, qty } = e.target.dataset;
    const newQty = Number(qty);

    handleFetch("/shop/cart/update", { id, newQty }).then((cart) => setCart(cart));
  };

  render() {
    const { cartInfo } = this.props;

    if (!cartInfo) {
      return null;
    }

    const { cart, cartKeys } = cartInfo;

    return (
      <Table>
        <Table.Body>
          {cartKeys.length === 0 ? (
            <h1>Your cart is currently empty.</h1>
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
