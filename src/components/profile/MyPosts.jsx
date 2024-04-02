import useProfile from "../../hooks/useProfile";
import PostLists from "../posts/PostLists";
const MyPosts = () => {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostLists posts={posts}></PostLists>
    </>
  );
};

export default MyPosts;
