import React from "react";
import { Table, Image, Icon } from "semantic-ui-react";

import "./cart-item.styles.scss";

const CartItem = ({ id, item, handleClick }) => {
  const { name, imgUrl, price, quantity } = item;

  const priceFormat = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  });

  return (
    <Table.Row>
      <Table.Cell>
        <Image src={imgUrl} rounded size="small" />
      </Table.Cell>
      <Table.Cell content={name} />
      <Table.Cell content={priceFormat.format(price)} />
      <Table.Cell>
        <Icon
          name="triangle left"
          className={quantity === 1 ? null : "update-qty"}
          onClick={quantity === 1 ? null : handleClick}
          data-id={id}
          data-qty={quantity - 1}
        />
        {quantity}
        <Icon
          name="triangle right"
          className="update-qty"
          onClick={handleClick}
          data-id={id}
          data-qty={quantity + 1}
        />
      </Table.Cell>
      <Table.Cell>
        <Icon
          name="remove circle"
          className="update-qty"
          onClick={handleClick}
          data-id={id}
          data-qty={0}
        />
      </Table.Cell>
      <Table.Cell content={priceFormat.format(price * quantity)} />
    </Table.Row>
  );
};

export default CartItem;
