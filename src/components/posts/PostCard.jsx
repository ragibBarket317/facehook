/* eslint-disable react/prop-types */
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <>
      <article className="card mt-6 lg:mt-8">
        <PostHeader post={post}></PostHeader>
        <PostBody poster={post?.image} content={post?.content}></PostBody>
        <PostAction
          post={post}
          commentCount={post?.comments?.length}
        ></PostAction>
        <PostComment post={post}></PostComment>
      </article>
    </>
  );
};

export default PostCard;
