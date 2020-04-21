import React from "react";
import { Table, Image, Icon } from "semantic-ui-react";

const CartItem = ({ id, item, handleClick, priceFormat }) => {
  const { name, imgUrl, price, quantity } = item;

  return (
    <Table.Row>
      <Table.Cell>
        <Image src={imgUrl} rounded />
      </Table.Cell>
      <Table.Cell content={name} />
      <Table.Cell content={priceFormat.format(price)} textAlign="right" />
      <Table.Cell textAlign="center">
        <Icon
          name="triangle left"
          className={quantity === 1 ? null : "pointer"}
          onClick={quantity === 1 ? null : handleClick}
          data-id={id}
          data-qty={quantity - 1}
        />
        {quantity}
        <Icon
          name="triangle right"
          className="pointer"
          onClick={handleClick}
          data-id={id}
          data-qty={quantity + 1}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Icon
          name="remove circle"
          className="pointer"
          onClick={handleClick}
          data-id={id}
          data-qty={0}
        />
      </Table.Cell>
      <Table.Cell content={priceFormat.format(price * quantity)} textAlign="right" />
    </Table.Row>
  );
};

export default CartItem;
