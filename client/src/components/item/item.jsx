import React, { useState } from "react";
import { handleFetch } from "../../handle-fetch";

import { Card, Button } from "semantic-ui-react";

import "./item.styles.scss";

const Item = ({ item, withUser, setCart, setDimmer }) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    handleFetch("/shop/cart/add", { item }).then((cart) => setCart(cart));
  };

  const { name, imgUrl, price } = item;

  return (
    <Card>
      <div className="img" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img src={imgUrl} alt={name} />
        {hover && (
          <Button onClick={withUser ? handleClick : () => setDimmer(true)}>Add to Cart</Button>
        )}
      </div>
      <Card.Content>
        <span>{name}</span>
        <span>{"£" + price}</span>
      </Card.Content>
    </Card>
  );
};

export default Item;
