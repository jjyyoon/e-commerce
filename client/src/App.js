import React from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./components/sign-up/sign-up";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <a href="/signup">Create Account</a>
        </Route>
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
