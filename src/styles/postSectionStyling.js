import styled from "styled-components";

export const PostSectionHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;

export const PostSection = styled.div`
  padding: 1rem 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90%;
  margin: auto;
  @media only screen and (max-width: 1700px) {
    width: 95%;
    margin: auto;
    padding: 1rem;
  }
  @media only screen and (max-width: 1170px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 792px) {
    grid-template-columns: repeat(1, 1fr);
    width: 80%;
  }
  @media only screen and (max-width: 495px) {
    width: 95%;
  }
`;

export const CreateButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  text-align: center;
  @media only screen and (max-width: 1170px) {
    width: 100%;
    justify-content: center;
  }
  .create-btn {
    padding: 1%;
    width: 160px;
    height: 60px;
    border-radius: 15px;
    font-size: 1.2rem;
    background: none;
    border: 3px solid #629cdf;
    :hover {
      cursor: pointer;
    }
    @media only screen and (max-width: 1700px) {
      margin-top: 1rem;
    }
  }
`;
