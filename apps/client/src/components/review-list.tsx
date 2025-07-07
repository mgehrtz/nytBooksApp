import { Comment } from "@/types/interfaces/comment.interface";

export default function ReviewList({ comments }: { comments: Comment[]}) {
  return (
    <>
      { comments.map((comment) => (
        <p key={ comment.id } className="p-2 border mb-1">{ comment.content }</p>
      ))}
    </>
  );
}