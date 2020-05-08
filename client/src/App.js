import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { handleFetch } from "./handle-fetch";

import { Route, Switch } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import SignUpPage from "./pages/sign-up/sign-up";
import CollectionPage from "./pages/collection/collection";
import CartPage from "./pages/cart/cart";
import CheckoutPage from "./pages/checkout/checkout";

import "./App.scss";

const stripePromise = loadStripe("pk_test_POGhn3j2XZbJbHU5WjIJGqVX00OLkDtLFY");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loggedIn: null, cartInfo: null };
  }

  createCartInfo = cart => {
    const cartItemIds = Object.keys(cart);
    return { cart, cartItemIds };
  };

  setUser = user => {
    if (!user) {
      this.setState({ user, loggedIn: null, cartInfo: null });
      return;
    }

    const cartInfo = this.createCartInfo(user.cart);
    this.setState({ user, loggedIn: true, cartInfo });
  };

  setCart = cart => {
    const cartInfo = this.createCartInfo(cart);
    this.setState({ cartInfo });
  };

  componentDidMount() {
    handleFetch("/users/auth").then(user => {
      if (!user) {
        this.setState({ loggedIn: false });
      } else {
        this.setUser(user);
      }
    });
  }

  render() {
    const { user, loggedIn, cartInfo } = this.state;

    return (
      <Elements
        stripe={stripePromise}
        options={{
          fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Muli:400,700&display=swap" }]
        }}
      >
        <div className="App">
          <Header loggedIn={loggedIn} setUser={this.setUser} cartInfo={cartInfo} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route
              path="/signup"
              render={routeProps => <SignUpPage loggedIn={loggedIn} setUser={this.setUser} {...routeProps} />}
            />
            <Route path="/shop/:category">
              <CollectionPage loggedIn={loggedIn} setUser={this.setUser} setCart={this.setCart} />
            </Route>
            <Route path="/cart">
              <CartPage loggedIn={loggedIn} cartInfo={cartInfo} setCart={this.setCart} />
            </Route>
            <Route
              path="/checkout"
              render={routeProps => (
                <CheckoutPage user={user} loggedIn={loggedIn} setCart={this.setCart} {...routeProps} />
              )}
            />
          </Switch>
        </div>
      </Elements>
    );
  }
}

export default App;
