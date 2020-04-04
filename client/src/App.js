import React from "react";
import { Route, Switch } from "react-router-dom";
import { handleFetch } from "./handle-fetch";

import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import CollectionPage from "./pages/collection/collection";
import SignUp from "./components/sign-up/sign-up";
import SignIn from "./components/sign-in/sign-in";
import CartPage from "./pages/cart/cart";

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, cartInfo: null };
  }

  createCartInfo = (cart) => {
    const cartKeys = Object.keys(cart);
    return { cart, cartKeys };
  };

  setUser = (user) => {
    const cartInfo = this.createCartInfo(user.cart);
    this.setState({ user, cartInfo });
  };

  setCart = (cart) => {
    const cartInfo = this.createCartInfo(cart);
    this.setState({ cartInfo });
  };

  componentDidMount() {
    handleFetch("/users/auth").then((user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  render() {
    const { user, cartInfo } = this.state;

    return (
      <div className="App">
        <Header user={user} cartInfo={cartInfo} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop/:category" render={() => <CollectionPage setCart={this.setCart} />} />
          <Route
            path="/cart"
            render={(routeProps) => (
              <CartPage cartInfo={cartInfo} setCart={this.setCart} {...routeProps} />
            )}
          />
          <Route path="/signup" render={() => <SignUp setUser={this.setUser} />} />
          <Route path="/signin" render={() => <SignIn setUser={this.setUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
