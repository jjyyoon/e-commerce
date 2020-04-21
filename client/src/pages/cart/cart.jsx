import React, { useState, useEffect } from "react";
import { handleFetch } from "../../handle-fetch";

import { Table } from "semantic-ui-react";
import CartItem from "../../components/cart-item/cart-item";
import WithAuth from "../../components/with-auth/with-auth";

import "./cart.styles.scss";

const CartPage = ({ cartInfo: { cart, cartItemIds }, setCart }) => {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let subtotal = 0;

    cartItemIds.forEach((cartItemId) => {
      let { price, quantity } = cart[cartItemId];
      subtotal = subtotal + price * quantity;
    });

    setSubtotal(subtotal);
  }, [cart, cartItemIds]);

  const handleClick = (e) => {
    const { id, qty } = e.target.dataset;
    const newQty = Number(qty);

    handleFetch("/shop/cart/update", { id, newQty }).then((cart) => setCart(cart));
  };

  const columns = ["Price", "Quantity", "Remove", "Total"];
  const priceFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

  return (
    <div className="page cart-page">
      <h1>{cartItemIds.length === 0 ? "Your cart is currently empty." : "Your cart"}</h1>
      {cartItemIds.length !== 0 && (
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="Item" colSpan="2" />
              {columns.map((col, idx) => (
                <Table.HeaderCell key={idx} content={col} textAlign="center" />
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cartItemIds.map((cartItemId, idx) => (
              <CartItem
                key={idx}
                id={cartItemId}
                item={cart[cartItemId]}
                handleClick={handleClick}
                priceFormat={priceFormat}
              />
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6" textAlign="right">
                Subtotal:　{priceFormat.format(subtotal)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )}
    </div>
  );
};

export default WithAuth(CartPage);
