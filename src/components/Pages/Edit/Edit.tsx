import React, { useState } from 'react';
import Navigation from '../../Layout/Navigation/Navigation';
import Form from '../../Layout/Form/Form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;
  const [userInputs, setUserInputs] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const editBlog = (e: any) => {
    e.preventDefault();
    axios
      .put(`${baseUrl}/${params.id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: params.id,
          ...userInputs,
        }),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert('Updated!');
        } else {
          alert('Oh no, something went wrong, please try again');
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => navigate('/'));
  };

  return (
    <>
      <Navigation text1="home" link1="/" />
      <h1 style={{ textAlign: 'center' }}>Posts ID: {params.id}</h1>
      <Form
        btntext="update values"
        firstplaceholder="New title"
        secondplaceholder="New body"
        handleSubmit={editBlog}
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

export default Edit;
