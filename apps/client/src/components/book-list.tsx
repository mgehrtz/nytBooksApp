import { getBestSellersForCategory } from "@/utils/utils";
import { Book } from "./book";

export async function BookList({ params } : { params: Promise<{ categoryId: number }> }) {
  const catId = (await params).categoryId;
  const data = await getBestSellersForCategory(catId);
  
  return (
    <div className="bg-white p-5 my-3 rounded-2xl w-75% mx-auto flex-1">
      <h4 className="text-3xl font-bold text-black mb-3">{ data.listName }</h4>
      <hr className="mb-3"></hr>
        { data.books.map((book, bookIndex) => (
          <Book key={`list_${data.listId}_book_${bookIndex}`} rank={ bookIndex } book={ book } />
        ))}
    </div>
  );
}
