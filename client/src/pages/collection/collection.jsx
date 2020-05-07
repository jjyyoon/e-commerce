import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card, Loader } from "semantic-ui-react";
import Item from "../../components/item/item";
import CustomDimmer from "../../components/custom-dimmer/custom-dimmer";
import SignIn from "../../components/sign-in/sign-in";

const CollectionPage = ({ loggedIn, setUser, setCart }) => {
  const [items, setItems] = useState(null);
  const [dimmer, setDimmer] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    handleFetch(`/shop/load/${category}`).then(items => setItems(items));
  }, [category]);

  return (
    <Card.Group className="page collection-page">
      {items ? (
        items.map((item, idx) => (
          <Item key={idx} item={item} loggedIn={loggedIn} setCart={setCart} setDimmer={setDimmer} />
        ))
      ) : (
        <Loader active content="Loading" inline="centered" size="big" />
      )}
      {dimmer && (
        <CustomDimmer
          onClickOutside={() => setDimmer(false)}
          header="To add an item to your cart, please sign in!"
          icon="user circle"
          page
        >
          <SignIn setUser={setUser} setActive={setDimmer} inverted />
        </CustomDimmer>
      )}
    </Card.Group>
  );
};

export default CollectionPage;
