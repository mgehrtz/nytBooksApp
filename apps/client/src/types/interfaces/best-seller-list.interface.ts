import { Book } from "./book.interface";

export interface BestSellerList {
  listId: number;
  listName: string;
  books: Book[];
}