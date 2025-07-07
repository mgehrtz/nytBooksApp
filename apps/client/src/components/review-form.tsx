'use client'

import { postComment } from "@/utils/utils";
import { Button, Form, Input, Textarea } from "@heroui/react";
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
    <Form
      className="min-w-fit w-full max-w-xs flex flex-col gap-4"
      onSubmit={processComment}
      id="commentForm"
      ref={formRef}
    >
      <Textarea
        isRequired
        errorMessage="Comment field is empty."
        label="Comment"
        labelPlacement="outside"
        name="comment"
        placeholder="Comment..."
        type="text"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
      <Input type="hidden" name="bookId" value={ bookId } />
    </Form>
  );
}

interface Props {
  onPostSuccess: (newCommentList: Comment[]) => void;
  bookId: string;
  commentsList: Comment[];
}