import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfileApi = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          data: error.message,
        });
      }
    };

    fetchProfileApi();
  }, []);

  if (state?.loading) {
    return <div>Fetching error...</div>;
  }
  return (
    <>
      <ProfileInfo></ProfileInfo>
      <MyPosts></MyPosts>
    </>
  );
};

export default ProfilePage;
