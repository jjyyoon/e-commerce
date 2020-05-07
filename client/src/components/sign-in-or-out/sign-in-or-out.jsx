import React, { useState } from "react";

import { MenuItem, Icon } from "semantic-ui-react";
import SignInDropdown from "../sign-in-dropdown/sign-in-dropdown";

const SignInOrOut = ({ loggedIn, setUser }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <MenuItem className="pointer" onClick={loggedIn ? null : () => setDropdown(true)}>
      <Icon name="sign in" />
      {loggedIn ? "Sign Out" : "Sign In"}
      {dropdown && <SignInDropdown setUser={setUser} setDropdown={setDropdown} />}
    </MenuItem>
  );
};

export default SignInOrOut;
