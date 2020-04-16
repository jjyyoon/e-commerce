import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Divider, Button } from "semantic-ui-react";
import SignIn from "../sign-in/sign-in";

import "./sign-in-dropdown.styles.scss";

const SignInDropdown = ({ setUser, setActive }) => {
  const dropdown = useRef(null);

  const handleClick = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="sign-in-dropdown" ref={dropdown}>
      <SignIn setUser={setUser} setActive={setActive} />
      <Divider horizontal>New to us?</Divider>
      <Button as={Link} to="/signup" content="Sign Up" onClick={() => setActive(false)} />
    </div>
  );
};

export default SignInDropdown;
