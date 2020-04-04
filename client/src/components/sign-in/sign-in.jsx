import React from "react";
import { withRouter } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { Button, Form } from "semantic-ui-react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }

  handleSubmit = (e) => {
    this.setState({ err: null });

    const { email, password } = e.target;

    const user = { email: email.value, password: password.value };

    handleFetch("/users/login", user, 401).then((user) => {
      if (!user) {
        this.setState({ err: "Wrong email address or password, please try again." });
        return;
      }

      const { history, setUser } = this.props;
      setUser(user);
      history.push("/");
    });
  };

  render() {
    const { err } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Email" name="email" type="email" required width={4} />
        <Form.Input label="Password" name="password" type="password" required width={4} />
        {err ? <p className="error">{err}</p> : null}
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(SignIn);
