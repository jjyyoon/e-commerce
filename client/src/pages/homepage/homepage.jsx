import React from "react";

import hats from "../../../src/assets/hats.jpg";
import jackets from "../../../src/assets/jackets.jpg";
import sneakers from "../../../src/assets/sneakers.jpg";
import womens from "../../../src/assets/womens.jpg";
import mens from "../../../src/assets/mens.jpg";

import "./homepage.styles.scss";

const Homepage = () => {
  const categories = [hats, jackets, sneakers, womens, mens];

  return (
    <div className="homepage">
      {categories.map((category, idx) => (
        <div key={idx} className="background" style={{ backgroundImage: `url(${category})` }} />
      ))}
    </div>
  );
};

export default Homepage;
