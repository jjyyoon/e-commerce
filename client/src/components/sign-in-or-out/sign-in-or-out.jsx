import React, { useState } from "react";

import { MenuItem, Icon } from "semantic-ui-react";
import SignInDropdown from "../sign-in-dropdown/sign-in-dropdown";

const SignInOrOut = ({ withUser, setUser }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <MenuItem className="pointer" onClick={withUser ? null : () => setDropdown(true)}>
      <Icon name="user" />
      {withUser ? "Sign Out" : "Sign In"}
      {dropdown && <SignInDropdown setUser={setUser} setDropdown={setDropdown} />}
    </MenuItem>
  );
};

export default SignInOrOut;
