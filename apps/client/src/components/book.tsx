import { Image, Link } from "@heroui/react";
import { NytBook } from "@interfaces/NytBook.interface";

export function Book({ book }: { book: NytBook }) {
  return (
    <Link 
      className="book flex bg-slate-100 p-3 mb-2 rounded-2xl"
      href={ `/book/${encodeURI(book.primary_isbn13)}` }
    >
      <Image 
        src={ book.book_image }
        alt={ `Image of ${book.title}` }
        height={ 150 }
        className="mr-3 flex-0 rounded-sm"
      />
      <div className="details flex flex-col justify-center flex-1">
        <span className="text-sm text-gray-500 font-black mb-1">{ book.author }</span>
        <h3 className="text-large font-bold text-black">{ book.title }</h3>
        <p className="text-black text-sm">{ book.description }</p>
      </div>
    </Link>
  );
}