import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
});

export default rootReducer;
