export interface Comment {
  id: number;
  content: string;
  username: string;
  publishedDate: Date;
  updatedDate?: Date;
  responses: Comment[];
  bookId: string;
}