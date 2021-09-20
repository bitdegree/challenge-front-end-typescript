import * as actions from "../actions/postActions";

interface postState {
  post: Record<string, string | object>;
  isLoading: boolean;
  hasErrors: boolean;
}

const initialState: postState = {
  post: {},
  isLoading: false,
  hasErrors: false,
};

export type Action = {
  type: string;
  payload?: any;
};

const postReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actions.GET_POST:
      return { ...state, isLoading: true };
    case actions.GET_POST_SUCCESS:
      return { post: action.payload, isLoading: false, hasErrors: false };
    case actions.GET_POST_FAILURE:
      return { ...state, isLoading: false, hasErrors: true };
    default:
      return state;
  }
};

export const postSelector = (state: { post: any }) => state.post;
export default postReducer;
