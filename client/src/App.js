import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import CollectionPage from "./pages/collection/collection";
import SignUp from "./components/sign-up/sign-up";
import SignIn from "./components/sign-in/sign-in";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route path="/shop/:category" component={CollectionPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
