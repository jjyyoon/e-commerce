import React from "react";
import { Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";

const WithAuth = (WrappedComponents) => ({ withUser, ...otherProps }) => {
  if (withUser === null) {
    return (
      <Loader active inline="centered" size="big" style={{ marginTop: "4.5rem" }}>
        Loading
      </Loader>
    );
  }

  if (!withUser) {
    alert("Please sign in to view this page.");
    return <Redirect to="/" />;
  }

  if (withUser) {
    return <WrappedComponents {...otherProps} />;
  }
};

export default WithAuth;
