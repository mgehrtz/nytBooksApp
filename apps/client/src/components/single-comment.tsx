'use client'

import { Comment } from "@/types/interfaces/comment.interface";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Form, Textarea } from "@heroui/react";
import { useState } from "react";
import DeleteCommentButton from "./delete-comment-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function SingleComment({ comment, handleDelete, handleEdit }: { comment: Comment, handleDelete: (commentId: number) => void, handleEdit: (commentId: number, newContent: string) => void }) {
  const [ isEditing, setIsEditing ] = useState(false);

  function updateComment(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newContent = data?.comment as string;
    handleEdit(comment.id, newContent);
    setIsEditing(false);
  }

  return (
    <Card className="mb-3">
      <CardHeader className="flex items-center justify-between">
        <h4 className="text-sm font-bold">{ comment.user.firstName } { comment.user.lastName }</h4>
        <div>
          <span className="text-xs mr-3">
            { new Date(comment.publishedDate).toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }
            { (comment?.updatedDate != null) && `  |  Edited`}
          </span>
          <DeleteCommentButton commentId={ comment.id } isDisabled={isEditing} onDelete={() => handleDelete(comment.id)} />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {
          (!isEditing) && <p className="px-3 pt-3 pb-5 bg-slate-50 rounded-2xl">{ comment.content }</p>
        }
        {
          (isEditing) && (
            <Form
              className="grow flex flex-col gap-4"
              onSubmit={updateComment}
              id="editCommentForm"
            >
              <Textarea
                isRequired
                errorMessage="Comment field is empty."
                label="Comment"
                labelPlacement="inside"
                name="comment"
                type="text"
                variant="bordered"
                className="grow"
                defaultValue={ comment.content }
              />
              <div className="flex gap-2">
                <Button color="primary" type="submit">
                  Save Changes
                </Button>
                <Button color="danger" onPress={() => setIsEditing(false)}>
                  Discard Changes
                </Button>
              </div>
            </Form> 
          )
        }
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button isIconOnly color="primary" variant="faded" onPress={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </CardFooter>
    </Card>
  );
}