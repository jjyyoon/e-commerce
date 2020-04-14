import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card, Button, HeaderSubheader } from "semantic-ui-react";
import CustomDimmer from "../custom-dimmer/custom-dimmer";

import "./item.styles.scss";

const Item = ({ history, item, setCart }) => {
  const [dim, setDim] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    handleFetch("/shop/cart/add", { item }).then(({ loggedIn, cart }) => {
      if (!loggedIn) {
        setDim(true);
      } else {
        setCart(cart);
      }
    });
  };

  const { name, imgUrl, price } = item;

  return (
    <Card>
      <div className="img" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img src={imgUrl} alt={name} />
        {hover && <Button onClick={handleClick}>Add to Cart</Button>}
      </div>
      <Card.Content>
        <span>{name}</span>
        <span>{"£" + price}</span>
      </Card.Content>
      {dim ? (
        <CustomDimmer icon="user">
          To add an item to your cart, please sign in!
          <HeaderSubheader>
            <Button onClick={() => history.push("/signin")}>Sign In</Button>
            <Button onClick={() => history.push("/signup")}>Sign Up</Button>
          </HeaderSubheader>
        </CustomDimmer>
      ) : null}
    </Card>
  );
};

export default withRouter(Item);
