import { Comment } from "@/types/interfaces/comment.interface";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import DeleteCommentButton from "./delete-comment-button";

export default function ReviewList({ comments, handleDelete }: { comments: Comment[], handleDelete: (commentId: number) => void}) {
  function editComment(comment: Comment){
    console.warn(comment);
  }

  return (
    <>
      <h5 className="my-3 font-bold">What did others think?</h5>
      <Divider className="mb-5" />
      { (comments.length == 0) && <p className="text-center mb-7 text-sm italic font-light">Be the first to tell others what you thought of this book!</p> }
      { comments.map((comment) => (
        <Card key={ comment.id } className="mb-3">
          <CardHeader className="flex items-center justify-between">
            <h4 className="text-sm font-bold">{ comment.user.firstName } { comment.user.lastName }</h4>
            <div>
              <span className="text-xs mr-3">
                { new Date(comment.publishedDate).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }
                { (comment?.updatedDate != null) && `  |  Edited`}
              </span>
              <DeleteCommentButton commentId={ comment.id } onDelete={() => handleDelete(comment.id)} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="px-3 pt-3 pb-5 bg-slate-50 rounded-2xl">{ comment.content }</p>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button isIconOnly color="primary" variant="faded" onPress={() => editComment(comment)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}