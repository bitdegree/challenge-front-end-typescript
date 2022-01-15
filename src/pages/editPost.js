import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

//Styles
import GlobalStyle from "../styles/globalStyles";
import { FormSection } from "../styles/formStyling";
import { FormContainer } from "../styles/formStyling";
import { FormStyled } from "../styles/formStyling";
import { TitleInput } from "../styles/formStyling";
import { BodyInput } from "../styles/formStyling";
import { SubmitButton } from "../styles/formStyling";

const EditPost = () => {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [blogInputs, setBlogInputs] = useState({ title: "", body: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlogInputs(blogInputs);
    // console.log(newTitle);
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, blogInputs)
      .then((response) => {
        setBlogInputs(blogInputs);
        console.log(response);
        alert("Data has beeen sent");
      });
  };
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <FormSection>
        <FormContainer>
          <GlobalStyle />
          <h1>
            Currently editing:{" "}
            {blogInputs.title ? blogInputs.title : posts.title}
          </h1>
          <FormStyled onSubmit={handleSubmit}>
            <TitleInput>
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                className="title"
                id="title"
                name="title"
                placeholder={posts.title}
                value={blogInputs.title}
                onChange={(e) =>
                  setBlogInputs({ ...blogInputs, title: e.target.value })
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
                placeholder={posts.body}
                spellCheck="false"
                value={blogInputs.body}
                onChange={(e) =>
                  setBlogInputs({ ...blogInputs, body: e.target.value })
                }
                required
              ></textarea>
            </BodyInput>
            <SubmitButton type="submit" value="Send" />
            <Link to={`/post/${posts.id}`}>Go back to post preview.</Link>
          </FormStyled>
        </FormContainer>
      </FormSection>
    </div>
  );
};

export default EditPost;
