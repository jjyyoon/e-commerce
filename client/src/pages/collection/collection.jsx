import React from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Card } from "semantic-ui-react";
import Item from "../../components/item/item";

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    handleFetch(`/shop/load/${category}`).then(items => {
      this.setState({ items });
    });
  }

  render() {
    const { items } = this.state;

    return (
      <Card.Group>
        {items ? (
          items.map((item, idx) => <Item key={idx} item={item} />)
        ) : (
          <h1>Loading</h1>
        )}
      </Card.Group>
    );
  }
}

export default withRouter(CollectionPage);
