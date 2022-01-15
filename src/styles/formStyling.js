import styled from "styled-components";

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  text-align: left;
  background: #59576b;
  width: 80%;
  border-radius: 15px;
  h1 {
    margin-bottom: 1rem;
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: white;
  }
`;

export const TitleInput = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;

  label {
    width: 100%;
  }
  input {
    width: 100%;
    min-height: 2.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 1%;
  }
`;
export const BodyInput = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    width: 100%;
    height: 200px;
    border: none;
    border-radius: 10px;
    padding: 1%;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;
export const SubmitButton = styled.input`
  width: 100px;
  height: 50px;
  border-radius: 15px;
  background: none;
  border: 3px solid #629cdf;
  color: #629cdf;
  margin-bottom: 1rem;
  :hover {
    color: white;
    cursor: pointer;
  }
`;
