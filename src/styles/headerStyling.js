import styled from "styled-components";

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #09080c;
  height: 15vh;
  width: 100%;
  padding: 5%;
  img {
    width: 100px;
    @media only screen and (max-width: 1540px) {
      width: 80px;
    }
  }
  .logo {
    color: white;
    font-family: Righteous, cursive;
    font-weight: 300;
    font-size: 3rem;
    margin-left: 1rem;
  }
`;
