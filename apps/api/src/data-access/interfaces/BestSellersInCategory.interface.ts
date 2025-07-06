import { Book } from '@prisma/client';

export interface BestSellersInCategory {
  listId: number;
  listName: string;
  books: Book[];
}
