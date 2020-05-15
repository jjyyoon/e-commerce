import React, { useState } from "react";
import { handleFetch } from "../../handle-fetch";
import { Card, Button, Label } from "semantic-ui-react";
import "./item.styles.scss";

const Item = ({ item, loggedIn, setCart, setDimmer }) => {
  const [hover, setHover] = useState(false);
  const [LabelActive, setLabelActive] = useState(false);

  const handleClick = () => {
    handleFetch("/shop/cart/add", { item }).then(cart => {
      setCart(cart);
      setLabelActive(true);
      setTimeout(() => setLabelActive(false), 3000);
    });
  };

  const { name, imgUrl, price } = item;

  return (
    <Card>
      <div className="img" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {LabelActive && <Label color="black" content="Added to cart!" />}
        <img src={imgUrl} alt={name} />
        {hover && (
          <Button onClick={loggedIn ? handleClick : () => setDimmer(true)}>Add to Cart</Button>
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
