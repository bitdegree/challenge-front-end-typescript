import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage/index";
import EditPostPage from "./pages/EditPostPage/index";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path="/edit-post/:id">
            <EditPostPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
