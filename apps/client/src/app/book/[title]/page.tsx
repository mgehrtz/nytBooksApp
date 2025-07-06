import { getBookByIsbn } from "@/utils/utils";

export default async function BookOverview({ params } : { params: Promise<{ isbn: string }> }) {

  const isbn = (await params).isbn;
  const book = await getBookByIsbn(isbn) as { title: string };

  return (
    <>
      <h1>{ book.title }</h1>
    </>
  );
}