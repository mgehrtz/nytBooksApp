import ReviewForm from "@/components/review-form";
import StarRating from "@/components/star-rating";
import { getBookByIsbn } from "@/utils/utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "@heroui/react";

export default async function BookOverview({ params } : { params: Promise<{ isbn: string }> }) {
  const isbn = (await params).isbn;
  const book = await getBookByIsbn(isbn);
  const rating = 2.5;

  return (
    <div className="flex mx-auto mt-12">
      <div className="flex flex-col w-35% max-w-xl">
        <Image 
          isBlurred
          src={ book.bookImageUrl }
          height='70vh'
          alt={`Image of the cover of ${book.title}.`}
        />
        <div className="mt-5">
          <p className="text-xs text-center italic font-bold text-slate-400">Average Rating</p>
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faStar} height='20' fill="gold" stroke="gold"/>
            <span className="text-lg font-bold ml-2">{ book.avgRating }</span>
          </div>
        </div>
      </div>
      <div className="w-65% flex flex-col pl-9 flex-1 mt-18">
        <StarRating currentUserRating={ rating } />
        <h3 className="text-lg font-bold text-slate-500 mt-7">{ book.author }</h3>
        <h1 className="text-6xl font-extrabold text-slate-700">{ book.title }</h1>
        <p className="my-3 pr-40">{ book.description }</p>
        <ReviewForm bookId={ isbn } />
      </div>
    </div>
  );
}