import { useCallback, useState } from "react";
import Navigation from "../../components/Navigation/index";
import Header from "../../components/Header/index";
import Form from "../../components/Form/index";
import "./dashboard.css";
// import { useDispatch } from "react-redux";

interface Event {
  target: Record<string, any>;
  preventDefault: () => void;
}

const Dashboard = () => {
  const [state, setState] = useState({
    title: "",
    body: "",
  });

  // const dispatch = useDispatch();

  const createPost = async (
    title: string,
    body: string,
    userId: number = 1
  ) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
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
      createPost(state.title, state.body);
      setState({ ...state, title: "", body: "" });
    },
    [state]
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
      <Header pageName="Dashboard" />
      <Navigation />
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        buttonText="Create Post"
        title={state.title}
        body={state.body}
      />
    </>
  );
};

export default Dashboard;
