import React, { useState } from "react";
import { handleFetch } from "../../handle-fetch";

import { Segment, Header, Icon, Form, Button } from "semantic-ui-react";
import "./sign-up.styles.scss";

const SignUp = ({ history, setUser }) => {
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  const handleSubmit = (e) => {
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
      password: password.value,
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
    <div className="page">
      <Header as="h2" icon textAlign="center">
        <Icon name="user outline" circular />
        Create Your Account
      </Header>

      <Segment placeholder>
        <Form onSubmit={handleSubmit}>
          <Form.Input label="First Name" name="firstName" type="text" required width={4} />
          <Form.Input label="Last Name" name="lastName" type="text" required width={4} />
          <Form.Input
            label="Email"
            name="email"
            type="email"
            required
            error={emailErr && { content: emailErr }}
            width={4}
          />
          <Form.Input label="Password" name="password" type="password" required width={4} />
          <Form.Input
            label="Confirm Password"
            name="confirm"
            type="password"
            required
            error={passwordErr && { content: passwordErr }}
            width={4}
          />
          <Button type="submit" color="teal" content="Submit" />
        </Form>
      </Segment>
    </div>
  );
};

/*
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emailErr: null, pwErr: null };
  }

  handleSubmit = (e) => {
    this.setState({ emailErr: null, pwErr: null });

    let { firstName, lastName, email, password, confirm } = e.target;

    if (password.value !== confirm.value) {
      this.setState({ pwErr: "Those passwords didn't match. Please try again." });
      return;
    }

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    handleFetch("/users/create", user).then(({ exist, user }) => {
      if (exist) {
        this.setState({ emailErr: "That email address is taken. Please try another." });
        return;
      }

      const { history, setUser } = this.props;
      setUser(user);
      history.push("/");
    });
  };

  render() {
    const { emailErr, pwErr } = this.state;
    return (
      <div className="page">
        <Header as="h2" icon textAlign="center">
          <Icon name="user outline" circular />
          Create Your Account
        </Header>

        <Segment placeholder>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label="First Name" name="firstName" type="text" required width={5} />
            <Form.Input label="Last Name" name="lastName" type="text" required width={5} />
            <Form.Input
              label="Email"
              name="email"
              type="email"
              required
              error={emailErr ? { content: emailErr } : null}
              width={5}
            />
            <Form.Input label="Password" name="password" type="password" required width={5} />
            <Form.Input
              label="Confirm Password"
              name="confirm"
              type="password"
              required
              error={pwErr ? { content: pwErr } : null}
              width={5}
            />
            <Button type="submit" color="teal" content="Submit" />
          </Form>
        </Segment>
      </div>
    );
  }
}
*/
export default SignUp;
