'use client'

import { Comment } from "@/types/interfaces/comment.interface";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";
import { useState } from "react";

export default function ReviewSection({ bookId, comments }: { bookId: string, comments: Comment[] }) {
  const [ commentsState, setCommentsState ] = useState(comments);

  function handleChildPostSuccess(commentList: Comment[]) {
    setCommentsState(commentList);
  }

  return (
    <>
      <ReviewList comments={commentsState} />
      <ReviewForm bookId={bookId} onPostSuccess={handleChildPostSuccess} commentsList={commentsState} />
    </>
  )
}