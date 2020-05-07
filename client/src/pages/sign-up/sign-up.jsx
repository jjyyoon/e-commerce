import React, { useState, useEffect } from "react";
import { handleFetch } from "../../handle-fetch";

import { Form, Button } from "semantic-ui-react";
import CustomSegmant from "../../components/custom-segment/custom-segment";
import "./sign-up.styles.scss";

const SignUpPage = ({ history, loggedIn, setUser }) => {
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const handleSubmit = e => {
    setEmailErr(null);
    setPasswordErr(null);

    let { firstName, lastName, email, password, confirm } = e.target;

    if (password.value !== confirm.value) {
      setPasswordErr("Those passwords didn't match. Please try again.");
      return;
    }

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    };

    handleFetch("/users/create", user).then(({ exist, user }) => {
      if (exist) {
        setEmailErr("That email address is taken. Please try another.");
        return;
      }

      setUser(user);
      history.push("/");
    });
  };

  return (
    <CustomSegmant page="sign-up-page" icon="user outline" header="Create Your Account">
      <Form onSubmit={handleSubmit}>
        <Form.Input label="First Name" name="firstName" required />
        <Form.Input label="Last Name" name="lastName" required />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          required
          error={emailErr && { content: emailErr }}
        />
        <Form.Input label="Password" name="password" type="password" required />
        <Form.Input
          label="Confirm Password"
          name="confirm"
          type="password"
          required
          error={passwordErr && { content: passwordErr }}
        />
        <Button type="submit" color="teal" content="Submit" />
      </Form>
    </CustomSegmant>
  );
};

export default SignUpPage;
