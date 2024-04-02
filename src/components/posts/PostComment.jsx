/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PostCommentList from "./PostCommentList";

const PostComment = ({ post }) => {
  const { auth } = useAuth();
  const [showAllComment, setShowAllComment] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();

  const addComment = async (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div>
        {/* <!-- comment input box --> */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="w-7 h-7 rounded-full lg:h-[34px] lg:w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              auth?.user?.avatar
            }`}
            alt="avatar"
          />

          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => addComment(e)}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        {/* <!-- comment filter button --> */}
        <div className="mt-4">
          <button
            onClick={() => setShowAllComment(!showAllComment)}
            className="text-gray-300 max-md:text-sm"
          >
            All Comment ▾
          </button>
        </div>
        {/* <!-- comments --> */}
        {showAllComment && (
          <PostCommentList comments={comments}></PostCommentList>
        )}
        {/* <!-- comments ends --> */}
      </div>
    </>
  );
};

export default PostComment;
