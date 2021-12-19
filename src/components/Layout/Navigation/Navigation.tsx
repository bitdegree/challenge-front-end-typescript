import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavigationWrapper = styled.header`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #292b2c;
  top: 0;
  position: sticky;

  .nav-wrap {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }

  .logo-text {
    color: white;
    font-size: 2rem;
    text-decoration: none;
  }

  .nav-link {
    color: white;
    background-color: #0275d8;
    text-decoration: none;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .nav-link:active {
    background-color: white;
    color: black;
  }
`;

interface Props {
  link1: string;
  text1: string;
}

const Navigation: FC<Props> = ({ text1, link1 }) => (
  <NavigationWrapper>
    <div className="nav-wrap">
      <Link className="logo-text" to="/">
        Bitdegree
      </Link>
      <Link className="nav-link" to={link1}>
        {text1}
      </Link>
    </div>
  </NavigationWrapper>
);

export default Navigation;
