import React, { useState } from 'react';
import Navigation from '../../Layout/Navigation/Navigation';
import Form from '../../Layout/Form/Form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Create = () => {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;
  const [userInputs, setUserInputs] = useState({});
  const navigate = useNavigate();

  const postBlog = (e: any) => {
    e.preventDefault();
    axios
      .post(baseUrl, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(userInputs),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert('success');
        } else {
          alert('Please try again');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => navigate('/'));
  };

  return (
    <>
      <Navigation text1="home" link1="/" />
      <h1 style={{ textAlign: 'center' }}>Create new Blog</h1>
      <Form
        btntext="Post"
        firstplaceholder="title"
        secondplaceholder="body"
        handleSubmit={postBlog}
        firstOnChange={(e: any) => {
          setUserInputs({
            ...userInputs,
            title: e.target.value,
          });
        }}
        secondOnChange={(e: any) => {
          setUserInputs({
            ...userInputs,
            body: e.target.value,
          });
        }}
      />
    </>
  );
};

export default Create;
