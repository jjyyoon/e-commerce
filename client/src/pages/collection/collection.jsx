import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card } from "semantic-ui-react";
import Item from "../../components/item/item";

const CollectionPage = ({ setCart }) => {
  const [items, setItems] = useState(null);
  const { category } = useParams();

  handleFetch(`/shop/load/${category}`).then((items) => setItems(items));

  return (
    <Card.Group>
      {items ? (
        items.map((item, idx) => <Item key={idx} item={item} setCart={setCart} />)
      ) : (
        <h1>Loading</h1>
      )}
    </Card.Group>
  );
};

export default CollectionPage;
