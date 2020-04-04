import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

import { Menu, Icon, Input } from "semantic-ui-react";
import CartMenu from "../cart-menu/cart-menu";
import "./header.styles.scss";

const Header = ({ user, cartInfo }) => {
  const categories = ["Hats", "Jackets", "Sneakers", "Womens", "Mens"];

  return (
    <div className="header">
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
          <Menu.Item>
            <Icon name="user circle" />
            {user ? "Sign Out" : "Sign In"}
          </Menu.Item>
          <CartMenu cartInfo={cartInfo} />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default withRouter(Header);
