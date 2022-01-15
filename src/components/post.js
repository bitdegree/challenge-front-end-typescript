import React from "react";
import { Link } from "react-router-dom";
import { PostDetails } from "../styles/postStyling";

//Styles
import GlobalStyle from "../styles/globalStyles";
import { PostStyled } from "../styles/postStyling";
import { LinkContainer } from "../styles/postStyling";
const Post = ({ postID, title, userId }) => {
  return (
    <>
      <PostStyled>
        <GlobalStyle />
        <PostDetails>
          <h2 className="title">{title}</h2>
          <p className="author">Post written by {userId}</p>
          <p className="post-no">Post no. {postID}</p>
        </PostDetails>
        <LinkContainer>
          <Link to={`/post/${postID}`}>View post</Link>
        </LinkContainer>
      </PostStyled>
    </>
  );
};

export default Post;
