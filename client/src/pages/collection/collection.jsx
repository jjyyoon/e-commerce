import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card, Loader } from "semantic-ui-react";
import Item from "../../components/item/item";

const CollectionPage = ({ setCart }) => {
  const [items, setItems] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    handleFetch(`/shop/load/${category}`).then((items) => setItems(items));
  }, [category]);

  return (
    <Card.Group className="page collection-page">
      {items ? (
        items.map((item, idx) => <Item key={idx} item={item} setCart={setCart} />)
      ) : (
        <Loader active content="Loading" inline="centered" size="big" />
      )}
    </Card.Group>
  );
};

export default CollectionPage;
