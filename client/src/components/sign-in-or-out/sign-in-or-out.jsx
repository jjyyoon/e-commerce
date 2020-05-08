import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { handleFetch } from "../../handle-fetch";

import { MenuItem, Icon } from "semantic-ui-react";
import SignInDropdown from "../sign-in-dropdown/sign-in-dropdown";

const SignInOrOut = ({ loggedIn, setUser }) => {
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();

  const logout = () => {
    handleFetch("/users/logout").then(result => {
      if (result) {
        setUser(null);
        history.push("/");
      }
    });
  };

  return (
    <MenuItem className="pointer" onClick={loggedIn ? logout : () => setDropdown(true)}>
      <Icon name={loggedIn ? "sign out" : "sign in"} />
      {loggedIn ? "Sign Out" : "Sign In"}
      {dropdown && <SignInDropdown setUser={setUser} setDropdown={setDropdown} />}
    </MenuItem>
  );
};

export default SignInOrOut;
