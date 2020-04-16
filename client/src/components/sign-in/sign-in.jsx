import React, { useState } from "react";
import { handleFetch } from "../../handle-fetch";

import { Form, Button, Icon } from "semantic-ui-react";
import "./sign-in.styles.scss";

const SignIn = ({ setUser, setActive }) => {
  const [err, setErr] = useState(false);

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
    <Form className="sign-in" onSubmit={handleSubmit}>
      <Form.Input label="Email" name="email" type="email" required />
      <Form.Input label="Password" name="password" type="password" required />
      {err && (
        <div className="error">
          <p>
            <Icon name="exclamation circle" />
            Wrong email address or password.
          </p>
          <p>Please try again.</p>
        </div>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignIn;
