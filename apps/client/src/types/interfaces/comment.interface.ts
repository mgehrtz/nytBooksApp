export interface Comment {
  id: number;
  content: string;
  username: string;
  publishedDate: Date;
  updatedDate?: Date;
  responseToId: number;
  responses: Comment[];
  bookId: string;
}