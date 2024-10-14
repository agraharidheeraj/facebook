import { ChevronDown, ChevronUp, Send } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { comment } from "postcss";
import { formateDate } from "@/lib/utils";

const PostComments = ({ post, onComment, commentInputRef }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = userStore();
  const visibleComments = showAllComments
    ? post?.comments
    : post?.comments?.slice(0, 2);

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      onComment({ text: commentText });
      setCommentText("");
    }
  };

  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");
  return (
    // comemts section list
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="max-h-60 overflow-y-auto pr-2">
        {visibleComments?.map((comment, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <Avatar className="w-8 h-8">
              {comment?.user?.profilePicture ? (
                <AvatarImage
                  src={comment?.user?.profilePicture}
                  alt={comment?.user?.username}
                />
              ) : (
                <AvatarFallback className="dark:bg-gray-400">
                  {comment?.user?.username
                    ?.split(" ")
                    .map((name) => name[0])
                    .join(" ")}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <div className="rounded-lg p-2">
                <p className="font-bold text-sm">{comment?.user?.username}</p>
                <p className="text-sm">{comment?.text}</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-400">
                <Button variant="ghost" size="sm">
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
                <span>{formateDate(comment.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
        {post?.comments?.length > 2 && (
          <p
            className="w-40 mt-2 text-blue-500 dark:text-gray-300 cursor-pointer"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show All Comments <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Avatar className="w-8 h-8">
          {user?.profilePicture ? (
            <AvatarImage src={user?.profilePicture} alt={user?.username} />
          ) : (
            <AvatarFallback className="dark:bg-gray-400">{userPlaceholder}</AvatarFallback>
          )}
        </Avatar>
        <Input
        value= {commentText}
        ref={commentInputRef}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown= {(e) => e.key === 'Enter' && handleCommentSubmit()}
          placeholder="Write a comment..."
          className="flex-grow cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] "
        />
        <Button variant="ghost" size="icon" className="hover:bg-transparent"
         onClick={handleCommentSubmit}
        >
          <Send className="h-5 w-5 text-blue-500" />
        </Button>
      </div>
    </div>
  );
};

export default PostComments;
