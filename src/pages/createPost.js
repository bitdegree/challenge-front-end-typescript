import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//Styling
import GlobalStyle from "../styles/globalStyles";
import { FormSection } from "../styles/formStyling";
import { FormContainer } from "../styles/formStyling";
import { FormStyled } from "../styles/formStyling";
import { TitleInput } from "../styles/formStyling";
import { BodyInput } from "../styles/formStyling";
import { SubmitButton } from "../styles/formStyling";

const CreatePost = () => {
  const [newBlogInputs, setNewBlogInputs] = useState({ title: "", body: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    setNewBlogInputs(newBlogInputs);
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, newBlogInputs)
      .then((response) => {
        setNewBlogInputs(newBlogInputs);
        console.log(response);
        alert("Data has been sent!");
      });
  };

  return (
    <div>
      <FormSection>
        <FormContainer>
          <GlobalStyle />
          <h1>Create A New Post</h1>
          <FormStyled onSubmit={handleSubmit}>
            <TitleInput>
              <label htmlFor="title">Post Title:</label>
              <input
                type="text"
                className="title"
                id="title"
                name="title"
                value={newBlogInputs.title}
                onChange={(e) =>
                  setNewBlogInputs({ ...newBlogInputs, title: e.target.value })
                }
                maxLength="80"
                required
              />
            </TitleInput>
            <BodyInput>
              <label htmlFor="body-text">Body Text</label>
              <textarea
                name="body-text"
                id="body-text"
                spellCheck="false"
                value={newBlogInputs.body}
                onChange={(e) =>
                  setNewBlogInputs({ ...newBlogInputs, body: e.target.value })
                }
                required
              ></textarea>
            </BodyInput>
            <SubmitButton type="submit" value="Send" />
            <Link to="/">Go back to homepage.</Link>
          </FormStyled>
        </FormContainer>
      </FormSection>
    </div>
  );
};

export default CreatePost;
