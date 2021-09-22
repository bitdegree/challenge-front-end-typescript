import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/index";
import Form from "../../components/Form/index";
import Navigation from "../../components/Navigation/index";
import { useHistory, useParams } from "react-router-dom";
import { postSelector } from "../../reducers/postReducer";
import { fetchPost } from "../../actions/postActions";

interface Event {
  target: Record<string, any>;
  preventDefault: () => void;
}

const EditPostPage = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { post } = useSelector(postSelector);

  useEffect(() => {
    dispatch(fetchPost(+id));
  }, [dispatch, id]);

  const [state, setState] = useState({
    title: post.title,
    body: post.body,
  });

  const { title, body } = state;

  const editPost = async (
    id: number,
    title: string,
    body: string,
    userId: number = 1
  ) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id,
          title,
          body,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = useCallback(
    (evt: Event) => {
      evt.preventDefault();
      editPost(+id, state.title, state.body);
      history.push(`/posts/${id}`);
    },
    [history, id, state.title, state.body]
  );

  const handleChange = useCallback(
    (evt: Event) => {
      const name = evt.target.name;
      const value = evt.target.value;
      setState({ ...state, [name]: value });
    },
    [state]
  );

  return (
    <>
      <Header pageName="Edit Post" />
      <Navigation />

      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        buttonText="Save Post"
        title={title}
        body={body}
      />
    </>
  );
};

export default EditPostPage;
