import PostCard from "./PostCard";

const PostLists = ({ posts }) => {
  console.log(posts);
  return (
    !!posts &&
    posts.map((post) => <PostCard key={post.id} post={post}></PostCard>)
  );
};

export default PostLists;
