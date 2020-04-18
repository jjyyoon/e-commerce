import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SignIn from "../sign-in/sign-in";

import "./sign-in-dropdown.styles.scss";

const SignInDropdown = ({ setUser, setDropdown }) => {
  const dropdown = useRef(null);
  const history = useHistory();

  const handleClick = (e) => {
    if (e.target.textContent === "Sign Up") {
      setDropdown(false);
      history.push("/signup");
    }
  };

  const handleClickOutside = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setDropdown(false);
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
      <SignIn setUser={setUser} setActive={setDropdown} signUpFunc />
    </div>
  );
};

export default SignInDropdown;
