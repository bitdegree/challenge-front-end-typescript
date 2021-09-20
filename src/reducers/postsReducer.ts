import * as actions from "../actions/postsActions";

// interface postsState {
//   posts: Record<string, any>[];
//   isLoading: boolean;
//   hasErrors: boolean;
// }

const initialState = {
  posts: [],
  isLoading: false,
  hasErrors: false,
};

export type Action = {
  type: string;
  payload?: any;
};

const postsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.GET_POSTS:
      return { ...state, isLoading: true };
    case actions.GET_POSTS_SUCCESS:
      return { posts: action.payload, isLoading: false, hasErrors: false };
    case actions.GET_POSTS_FAILURE:
      return { ...state, isLoading: false, hasErrors: true };
    default:
      return state;
  }
};
export const postsSelector = (state: { posts: any }) => state.posts;

export default postsReducer;
