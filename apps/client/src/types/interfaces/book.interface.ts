import { CategoryBook } from "./category-book.interface";
import { Comment } from "./comment.interface";
import { Rating } from "./rating.interface";

export interface Book {
  id: string;
  publisher: string;
  description: string;
  title: string;
  author: string;
  contributor: string;
  bookImageUrl: string;
  amazonProductUrl: string;
  ageGroup: string;
  bookReviewUrl: string;
  categories: CategoryBook[];
  avgRating: number;
  ratings: Rating[];
  comments: Comment[];
}
