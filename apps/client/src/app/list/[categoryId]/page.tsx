import { BookList } from "@/components/book-list";
import CategoryList from "@/components/category-list"

export default async function BestSellerList({ params }) {
  return (
    <div className="flex mx-auto">
      <CategoryList />
      <BookList params={params} />
    </div>
  );
}