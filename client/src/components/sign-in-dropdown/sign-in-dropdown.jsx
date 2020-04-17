import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Divider, Button } from "semantic-ui-react";
import SignIn from "../sign-in/sign-in";

import "./sign-in-dropdown.styles.scss";

const SignInDropdown = ({ setUser, setActive }) => {
  const dropdown = useRef(null);
  const history = useHistory();

  const handleClick = (e) => {
    if (e.target.textContent === "Sign Up") {
      setActive(false);
      history.push("/signup");
    }
  };

  const handleClickOutside = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sign-in-dropdown" ref={dropdown}>
      <SignIn setUser={setUser} setActive={setActive} />
      <Divider horizontal>New to us?</Divider>
      <Button content="Sign Up" />
    </div>
  );
};

export default SignInDropdown;
