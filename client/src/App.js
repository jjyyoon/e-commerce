import React from "react";
import { Route, Switch } from "react-router-dom";
import { handleFetch } from "./handle-fetch";

import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import CollectionPage from "./pages/collection/collection";
import SignUp from "./pages/sign-up/sign-up";
import CartPage from "./pages/cart/cart";

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loggedIn: null, cartInfo: null };
  }

  createCartInfo = (cart) => {
    const cartItemIds = Object.keys(cart);
    return { cart, cartItemIds };
  };

  setUser = (user) => {
    const cartInfo = this.createCartInfo(user.cart);
    this.setState({ user, loggedIn: true, cartInfo });
  };

  setCart = (cart) => {
    const cartInfo = this.createCartInfo(cart);
    this.setState({ cartInfo });
  };

  componentDidMount() {
    handleFetch("/users/auth").then((user) => {
      if (!user) {
        this.setState({ loggedIn: false });
      } else {
        this.setUser(user);
      }
    });
  }

  render() {
    const { loggedIn, cartInfo } = this.state;

    return (
      <div className="App">
        <Header loggedIn={loggedIn} setUser={this.setUser} cartInfo={cartInfo} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop/:category">
            <CollectionPage loggedIn={loggedIn} setUser={this.setUser} setCart={this.setCart} />
          </Route>
          <Route path="/cart">
            <CartPage loggedIn={loggedIn} cartInfo={cartInfo} setCart={this.setCart} />
          </Route>
          <Route
            path="/signup"
            render={(routeProps) => (
              <SignUp loggedIn={loggedIn} setUser={this.setUser} {...routeProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
