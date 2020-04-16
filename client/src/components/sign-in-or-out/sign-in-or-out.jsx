import React, { useState } from "react";

import { MenuItem, Icon } from "semantic-ui-react";
import SignInDropdown from "../sign-in-dropdown/sign-in-dropdown";

import "./sign-in-or-out.styles.scss";

const SignInOrOut = ({ user, setUser }) => {
  const [active, setActive] = useState(false);

  if (!user) {
    return (
      <MenuItem onClick={() => setActive(true)}>
        <Icon name="user circle" />
        Sign In
        {active && <SignInDropdown setUser={setUser} setActive={setActive} />}
      </MenuItem>
    );
  }

  if (user) {
    return (
      <MenuItem>
        <Icon name="user circle" />
        Sign Out
      </MenuItem>
    );
  }
};

export default SignInOrOut;
