import React, { useState } from "react";

import { MenuItem, Icon } from "semantic-ui-react";
import SignInDropdown from "../sign-in-dropdown/sign-in-dropdown";

const SignInOrOut = ({ user, setUser }) => {
  const [active, setActive] = useState(false);

  return (
    <MenuItem className="pointer" onClick={user ? null : () => setActive(true)}>
      <Icon name="user" />
      {user ? "Sign Out" : "Sign In"}
      {active && <SignInDropdown setUser={setUser} setActive={setActive} />}
    </MenuItem>
  );
};

export default SignInOrOut;
