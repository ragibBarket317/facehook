import { useEffect, useReducer } from "react";
import { actions } from "../actions";

import PostLists from "../components/posts/PostLists";
import useAxios from "../hooks/useAxios";
import { PostsReducer, initialState } from "../reducers/PostsReducer";

const HomePage = () => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
  }, []);

  console.log(state);

  if (state?.loading) {
    return <div>We are working...</div>;
  }

  if (state?.error) {
    return <div>Error: {state?.error?.message}</div>;
  }

  return (
    <div>
      <PostLists posts={state?.posts}></PostLists>
    </div>
  );
};

export default HomePage;
