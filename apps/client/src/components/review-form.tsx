'use client'

import { postComment } from "@/utils/utils";
import { Button, Form, Input, Textarea } from "@heroui/react";
import { Comment } from "@/types/interfaces/comment.interface";

export default function ReviewForm({ bookId }: { bookId: string; }) {
  async function processComment(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const comment = {} as Comment;
    comment.username = data?.username as string;
    comment.bookId = bookId;
    comment.content = data?.comment as string;
    comment.publishedDate = new Date();

    postComment(comment).then((success: boolean) => {
      if(success){
        e.currentTarget.reset();
      }
    });
  }

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onSubmit={processComment}
      id="commentForm"
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />

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