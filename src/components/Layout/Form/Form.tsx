import React, { FC } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  padding: 2rem;
  margin: 0 auto;
  width: 40%;
  input,
    textarea {
      outline: none;
      max-width: 100%;
      min-width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
      box-sizing: border-box;
    }
    input:hover,
    textarea:hover {
      border: 1px solid #0275d8;
    }
    button {
      padding: 1rem;
      color: white;
      background-color: #0275d8;
      border: none;
      width: 20%;
      display: block;
      margin: 0 auto;
      cursor:pointer;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 80%;
    button {
      width: 50%;
    }
  }
`;

interface Props {
  btntext: string;
  firstplaceholder: string;
  secondplaceholder: string;
  handleSubmit: any;
  firstOnChange: any;
  secondOnChange: any;
}

const Form: FC<Props> = ({
  handleSubmit,
  btntext,
  firstplaceholder,
  secondplaceholder,
  firstOnChange,
  secondOnChange,
}) => (
  <FormWrapper onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder={firstplaceholder}
      onChange={firstOnChange}
      required
    />
    <textarea
      placeholder={secondplaceholder}
      onChange={secondOnChange}
      required
    />
    <button>{btntext}</button>
  </FormWrapper>
);

export default Form;
