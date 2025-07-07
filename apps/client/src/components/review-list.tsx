import { Comment } from "@/types/interfaces/comment.interface";
import SingleComment from "./single-comment";
import { Divider } from "@heroui/react";

export default function ReviewList({ comments, handleDelete, handleEdit }: { comments: Comment[], handleDelete: (commentId: number) => void, handleEdit: (commentId: number, newContent: string) => void}) {
  return (
    <>
      <h5 className="my-3 font-bold">What did others think?</h5>
      <Divider className="mb-5" />
      { (comments.length == 0) && <p className="text-center mb-7 text-sm italic font-light">Be the first to tell others what you thought of this book!</p> }
      { comments.map((comment) => (
        <SingleComment key={comment.id} handleEdit={handleEdit} handleDelete={handleDelete} comment={comment} />
      ))}
    </>
  );
}