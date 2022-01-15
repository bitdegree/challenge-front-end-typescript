import styled from "styled-components";

export const PostSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const PostStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  text-align: left;
  background: #59576b;
  width: 80%;
  border-radius: 15px;
  button {
    width: 150px;
    height: 50px;
    border-radius: 15px;
    font-size: 1.2rem;
    background: none;
    border: 3px solid #629cdf;
    color: #629cdf;
    margin-bottom: 1rem;
    :hover {
      color: white;
      cursor: pointer;
    }
  }
  p {
    width: 70%;
    font-size: 1.3rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    span {
      font-weight: 800;
      text-decoration: underline;
    }
    @media only screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;
