import { getNytBestSellersData } from "@/utils/utils";
import { Book } from "./book";

export async function BookList() {
  const data = await getNytBestSellersData();
  
  return (
    <div>
      { data.results.lists.map((list, index) => (
        <div key={`list_${index}`} className="bg-white p-5 my-3 rounded-2xl max-w-2xl mx-auto">
          <h4 className="text-3xl font-bold text-black mb-3">{ list.list_name }</h4>
          <hr className="mb-3"></hr>
            { list.books.map((book, bookIndex) => (
              <Book key={`list_${index}_book_${bookIndex}`} book={ book } />
            ))}
        </div>
      )) }
    </div>
  );
}
