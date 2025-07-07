'use client'

import { postComment } from "@/utils/utils";
import { Button, Card, CardBody, CardHeader, Form, Input, Textarea } from "@heroui/react";
import { Comment } from "@/types/interfaces/comment.interface";
import React, { useRef } from "react";

export default function ReviewForm({ bookId, commentsList, onPostSuccess }: Props) {

  const formRef = useRef<HTMLFormElement>(null);

  async function processComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const comment = {} as Comment;
    comment.username = data?.username as string;
    comment.bookId = bookId;
    comment.content = data?.comment as string;
    comment.publishedDate = new Date();

    postComment(comment).then((data: { success: boolean; comment: Comment | null}) => {
      if(data.success){
        const newCommentList = Array.from(commentsList);
        if(data.comment != null){
          newCommentList.push(data.comment);
        }
        onPostSuccess(newCommentList);
        formRef?.current?.reset();
      }
    });
  }

  return (
    <Card className="bg-slate-100 border-slate-200 border-1.5">
      <CardHeader>
        <h4 className="text-med font-bold">Add your voice to the conversation.</h4>
      </CardHeader>
      <CardBody>
        <Form
          className="grow flex flex-col gap-4"
          onSubmit={processComment}
          id="commentForm"
          ref={formRef}
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
            minRows={5}
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
          <Input type="hidden" name="bookId" value={ bookId } />
        </Form>
      </CardBody>
    </Card>
  );
}

interface Props {
  onPostSuccess: (newCommentList: Comment[]) => void;
  bookId: string;
  commentsList: Comment[];
}