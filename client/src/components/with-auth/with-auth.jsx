import React from "react";
import { Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

const WithAuth = (WrappedComponents) => ({ loggedIn, ...otherProps }) => {
  if (loggedIn === null) {
    return (
      <Loader active inline="centered" size="big" style={{ marginTop: "4.5rem" }}>
        Loading
      </Loader>
    );
  }

  if (!loggedIn) {
    alert("Please sign in to view this page.");
    return <Redirect to="/" />;
  }

  if (loggedIn) {
    return <WrappedComponents {...otherProps} />;
  }
};

export default WithAuth;
