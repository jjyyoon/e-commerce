import React from "react";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { user } = this.props.location.state;

    if (user) {
      this.setState({ user });
    }
  }

  render() {
    return (
      <div>
        <a href="/signup">Create Account</a>
        <a href="/signin">Sign In</a>
      </div>
    );
  }
}

export default Homepage;
