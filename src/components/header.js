import React from "react";
import logo from "../images/bitdegree.png";
import { HeaderStyled } from "../styles/headerStyling";
import "../styles.css";

const Header = () => {
  return (
    <HeaderStyled>
      <img src={logo} alt="bitdegree logo" />
      <h1 className="logo">BitDegree Blog</h1>
    </HeaderStyled>
  );
};

export default Header;
