import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import GlobalStyle from "../styles/globalStyles";
import { PostSection } from "../styles/postPageStyling";
import { PostStyled } from "../styles/postPageStyling";
const PostPage = () => {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        // console.log(data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <GlobalStyle />
      <PostSection>
        <PostStyled>
          <h1>{posts.id + ". " + posts.title}</h1>
          <p>{posts.body}</p>
          <p>
            {`Post written by`} <span>{`User no. ${posts.userId}`}</span>
          </p>
          <button>
            <Link to={`/post/${posts.id}/edit`}>Edit post</Link>
          </button>
          <Link to={`/`}>Go back to homepage.</Link>
        </PostStyled>
      </PostSection>
    </>
  );
};
export default PostPage;
