import React from "react";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state && state.user) {
      this.setState({ user: state.user });
    }
  }

  render() {
    return (
      <div>
        <a href="/signup">Create Account</a>
        <a href="/signin">Sign In</a>
        <a href="/shop">Shop</a>
      </div>
    );
  }
}

export default Homepage;
