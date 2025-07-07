'use client'

import { Comment } from "@/types/interfaces/comment.interface";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";
import { useState } from "react";
import { deleteComment } from "@/utils/utils";

export default function ReviewSection({ bookId, comments }: { bookId: string, comments: Comment[] }) {
  const [ commentsState, setCommentsState ] = useState(comments);

  function handleChildPostSuccess(commentList: Comment[]) {
    setCommentsState(commentList);
  }

  function handleChildDelete(commentId: number){
    deleteComment(commentId).then((success) => {
      if(!success) return;
      const targetIndex = commentsState.findIndex((comment) => comment.id === commentId);
      console.warn(targetIndex);
      setCommentsState(prevItems => prevItems.filter((_, index) => index !== targetIndex));
    })
  }

  return (
    <>
      <ReviewList comments={commentsState} handleDelete={handleChildDelete} />
      <ReviewForm bookId={bookId} onPostSuccess={handleChildPostSuccess} commentsList={commentsState} />
    </>
  )
}