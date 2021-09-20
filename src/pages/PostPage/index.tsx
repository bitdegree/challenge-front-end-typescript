import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { useEffect } from "react";
import { fetchPost } from "../../actions/postActions";
import { postSelector } from "../../reducers/postReducer";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import "./postpage.css";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { post, isLoading, hasErrors } = useSelector(postSelector);

  useEffect(() => {
    dispatch(fetchPost(+id));
  }, [dispatch, id]);

  const renderPost = () => {
    if (isLoading) return <SkeletonLoader />;
    if (hasErrors) return <p>Unable to display post.</p>;
    return (
      <article className="post">
        <h2 className="postTitle">{post.title}</h2>
        <span className="postAuthor">
          Written by: Peter Drury
          <Link to={`/edit-post/${id}`}>
            <Button
              className="editPostButton"
              value="Edit Post"
              type="button"
            />
          </Link>
        </span>
        <p className="postBody">{post.body}</p>
      </article>
    );
  };

  return (
    <>
      <Header pageName="Post" />
      <Navigation />
      <main className="postContainer">{renderPost()}</main>
    </>
  );
};

export default PostPage;
