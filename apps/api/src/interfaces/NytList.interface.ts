import { NytBook } from './NytBook.interface';

export interface NytList {
  list_id: number;
  list_name: string;
  list_name_encoded: string;
  display_name: string;
  updated: string;
  books: NytBook[];
}
