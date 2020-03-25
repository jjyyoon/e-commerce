import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card, Image, Button, Header } from "semantic-ui-react";
import CustomDimmer from "../custom-dimmer/custom-dimmer";

const Item = ({ history, item }) => {
  const [dim, setDim] = useState(false);

  const { id, name, imgUrl, price } = item;

  const handleClick = () => {
    handleFetch("/shop/add", { id }).then(({ loggedIn, cart }) => {
      if (!loggedIn) {
        setDim(true);
        return;
      }

      console.log(cart);
    });
  };

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
          <Header.Subheader>
            <Button onClick={() => history.push("/signin")}>Sign In</Button>
            <Button onClick={() => history.push("/signup")}>Sign Up</Button>
          </Header.Subheader>
        </CustomDimmer>
      ) : null}
    </div>
  );
};

export default withRouter(Item);
