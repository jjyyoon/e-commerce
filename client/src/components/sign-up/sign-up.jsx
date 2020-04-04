import React from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Button, Form } from "semantic-ui-react";

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="First Name" name="firstName" type="text" required width={4} />
        <Form.Input label="Last Name" name="lastName" type="text" required width={4} />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          required
          error={emailErr ? { content: emailErr } : null}
          width={4}
        />
        <Form.Input label="Password" name="password" type="password" required width={4} />
        <Form.Input
          label="Confirm Password"
          name="confirm"
          type="password"
          required
          error={pwErr ? { content: pwErr } : null}
          width={4}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(SignUp);
