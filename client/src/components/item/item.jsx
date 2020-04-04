import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card, Image, Button, HeaderSubheader } from "semantic-ui-react";
import CustomDimmer from "../custom-dimmer/custom-dimmer";

const Item = ({ history, item, setCart }) => {
  const [dim, setDim] = useState(false);

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
    <div>
      <Card>
        <Image src={imgUrl} wrapped ui={false} />
        <Button onClick={handleClick}>Add to Cart</Button>
        <Card.Content>
          <Card.Description>{`${name}　${price}`}</Card.Description>
        </Card.Content>
      </Card>
      {dim ? (
        <CustomDimmer icon="user">
          To add an item to your cart, please sign in!
          <HeaderSubheader>
            <Button onClick={() => history.push("/signin")}>Sign In</Button>
            <Button onClick={() => history.push("/signup")}>Sign Up</Button>
          </HeaderSubheader>
        </CustomDimmer>
      ) : null}
    </div>
  );
};

export default withRouter(Item);
