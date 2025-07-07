'use client'

import { rateBook } from '@/utils/utils';
import dynamic from 'next/dynamic'

export default function StarRating({ currentUserRating, currentBookId }: { currentUserRating: number; currentBookId: string; }) {
 
  const ReactStars = dynamic(() => import('react-stars'), { ssr: false })

  // Catch Rating value
  const ratingChanged = (score: number) => {
    rateBook(currentBookId, score);
  }

  return (
    <div className="rounded-full bg-orange-50 border-1.5 border-orange-200 justify-center items-center p-1 w-auto flex">
      <p className="text-med font-semibold mr-2">Your rating:</p>
      <ReactStars
        count={5}
        half={false}
        onChange={ratingChanged}
        size={32}
        value={ currentUserRating || 0 }
        color2={'#ffd700'} 
      />
    </div>
  )
}