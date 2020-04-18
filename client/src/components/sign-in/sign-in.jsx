import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Form, Button, Icon, Divider } from "semantic-ui-react";
import "./sign-in.styles.scss";

const SignIn = ({ setUser, setActive, signUpFunc, inverted }) => {
  const [err, setErr] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setErr(false);

    const { email, password } = e.target;
    const user = { email: email.value, password: password.value };

    handleFetch("/users/login", user, 401).then((user) => {
      if (!user) {
        setErr(true);
        return;
      }

      setUser(user);
      setActive(false);
    });
  };

  return (
    <div className="sign-in">
      <Form onSubmit={handleSubmit} inverted={inverted}>
        <Form.Input label="Email" name="email" type="email" required />
        <Form.Input label="Password" name="password" type="password" required />
        {err && (
          <div className="error">
            <span>
              <Icon name="exclamation circle" />
              Wrong email address or password.
            </span>
            <span> Please try again.</span>
          </div>
        )}
        <Button type="submit" content="Submit" color="teal" />
      </Form>
      <Divider content="New to us?" horizontal inverted={inverted} />
      <Button
        content="Sign Up"
        onClick={!signUpFunc ? () => history.push("/signup") : null}
        color="red"
      />
    </div>
  );
};

export default SignIn;
