import { Book as IBook } from "@/types/interfaces/book.interface";
import { Image, Link } from "@heroui/react";

export function Book({ book, rank }: { book: IBook, rank: number }) {
  const adjustedRank = rank + 1;

  return (
    <Link 
      className="book flex bg-slate-100 p-3 mb-2 rounded-2xl"
      href={ `/book/${encodeURI(book.id)}` }
    >
      <Image 
        src={ book.bookImageUrl }
        alt={ `Image of ${book.title}` }
        height={ 200 }
        className="mr-3 flex-0 rounded-sm"
      />
      <div className="details flex flex-col justify-center flex-1">
        <span className="text-sm text-gray-500 font-black mb-1">{ book.author }</span>
        <h3 className="text-2xl font-bold text-black">{ book.title }</h3>
        <p className="text-black text-sm">{ book.description }</p>
        <span className="rank">{ adjustedRank }</span>
      </div>
    </Link>
  );
}