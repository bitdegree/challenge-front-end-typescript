export const GET_POST = "GET_POSTS";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";

export const getPost = () => ({ type: GET_POST });
export const getPostSuccess = (post: Record<string, any>) => ({
  type: GET_POST_SUCCESS,
  payload: post,
});
export const getPostFailure = () => ({ type: GET_POST_FAILURE });

export const fetchPost = (id: number) => {
  return async (dispatch: (arg: any) => any) => {
    dispatch(getPost());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();

      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostFailure());
    }
  };
};
