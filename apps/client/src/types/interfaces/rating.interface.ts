export interface Rating {
  id: number;
  score: number;
  publishedDate: Date;
  updatedDate?: Date;  
  userId: number;
  bookId: string;
}