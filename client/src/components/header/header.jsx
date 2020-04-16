import React from "react";
import { useLocation, Link, NavLink } from "react-router-dom";

import { Menu, Input } from "semantic-ui-react";
import SignInOrOut from "../sign-in-or-out/sign-in-or-out";
import CartMenu from "../cart-menu/cart-menu";
import "./header.styles.scss";

const Header = ({ user, setUser, cartInfo }) => {
  const categories = ["Hats", "Jackets", "Sneakers", "Womens", "Mens"];
  const location = useLocation();

  return (
    <div className={`header ${location.pathname === "/" ? "home-header" : ""}`}>
      <h1>
        <Link exact to="/">
          Starlet.
        </Link>
      </h1>

      <Menu secondary>
        {categories.map((category, idx) => (
          <Menu.Item
            key={idx}
            as={NavLink}
            to={`/shop/${category.toLowerCase()}`}
            name={category}
          />
        ))}

        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search" />
          </Menu.Item>
          <SignInOrOut user={user} setUser={setUser} />
          <CartMenu cartInfo={cartInfo} />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
