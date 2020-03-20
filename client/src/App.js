import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import SignUp from "./components/sign-up/sign-up";
import SignIn from "./components/sign-in/sign-in";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
