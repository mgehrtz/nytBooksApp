'use client'

import { Comment } from "@/types/interfaces/comment.interface";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";
import { useState } from "react";
import { deleteComment, editComment } from "@/utils/utils";

export default function ReviewSection({ bookId, comments }: { bookId: string, comments: Comment[] }) {
  const [ commentsState, setCommentsState ] = useState(comments);

  function handleChildPostSuccess(commentList: Comment[]) {
    setCommentsState(commentList);
  }

  function handleChildDelete(commentId: number) {
    deleteComment(commentId).then((success) => {
      if(!success) return;
      const targetIndex = commentsState.findIndex((comment) => comment.id === commentId);
      setCommentsState(prevItems => prevItems.filter((_, index) => index !== targetIndex));
    });
  }

  function handleChildEdit(commentId: number, newContent: string) {
    editComment(commentId, newContent).then((resp) => {
      if(resp.success){
        const targetIndex = commentsState.findIndex((comment) => comment.id === commentId);
        if(targetIndex === -1) return;
        const newCommentList = Array.from(commentsState);
        newCommentList[targetIndex] = resp.comment;
        setCommentsState(newCommentList);
      }
    })
  }

  return (
    <>
      <ReviewList comments={commentsState} handleDelete={handleChildDelete} handleEdit={handleChildEdit} />
      <ReviewForm bookId={bookId} onPostSuccess={handleChildPostSuccess} commentsList={commentsState} />
    </>
  )
}