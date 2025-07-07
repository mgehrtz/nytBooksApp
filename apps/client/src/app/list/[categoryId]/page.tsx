import { BookList } from "@/components/book-list";
import CategoryList from "@/components/category-list"
import { getBestSellersForCategory } from "@/utils/utils";

export default async function BestSellerList({ params }: { params: Promise<{ categoryId: number }>}) {

  const catId = (await params).categoryId;
  const data = await getBestSellersForCategory(catId);

  return (
    <div className="flex mx-auto">
      <CategoryList />
      <BookList books={data.books} listId={data.listId} listName={data.listName} />
    </div>
  );
}