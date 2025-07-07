import { BestSellerList } from "@/types/interfaces/best-seller-list.interface";
import { Book } from "@/types/interfaces/book.interface";
import { Category } from "@/types/interfaces/category.interface";
import { Comment } from "@/types/interfaces/comment.interface";
import { Rating } from "@/types/interfaces/rating.interface";

export function logOut() {
  window.alert('log out.');
}

export function getAllLists(): Promise<Category[]> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/category/all`
    ).then((resp) => {
      if(resp.ok){
        res(resp.json());
      }else {
        rej(resp);
      }
    })
  });
}

export function getBestSellersForCategory(categoryId: number): Promise<BestSellerList> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/book/best-sellers/${categoryId}`
    ).then((resp) => {
      if(resp.ok){
        res(resp.json())
      }else{
        console.warn(resp);
        rej(resp);
      }
    })
  })
}

export function getBestSellersCategories(): Promise<Category[]> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`
    ).then((resp) => {
      if(resp.ok){
        res(resp.json());
      }else{
        rej(resp.json());
      }
    })
  })
}

export function getBookByIsbn(isbn: string): Promise<Book> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/book/${isbn}`
    ).then(async (resp) => {
      if(resp.ok){
        res(await resp.json());
      }else{
        rej(await resp.json());
      }
    })
  })
}

export function getBookRatingByUser(bookId: string): Promise<Rating> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/rating/user/1/book/${bookId}` // todo get current user here
    ).then(async (resp) => {
      if(resp.ok){
        res(await resp.json());
      }else{
        rej(await resp.json());
      }
    })
  })
}

export function postComment(comment: Comment): Promise<{ success: boolean, comment: Comment | null }> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      }
    ).then(async (resp) => {
      if(resp.ok){
        const comment = await resp.json() as Comment;
        res({ success: true, comment: comment });
      }else{
        console.warn(await resp.json());
        rej({ success: false, comment: null });
      }
    });
  });
}

export function rateBook(bookId: string, score: number): Promise<boolean> {
  const data = { score: score }
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/rating/book/${bookId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    ).then(async (resp) => {
      if(resp.ok){
        console.warn('rating success.');
        res(true);
      }else{
        console.warn(await resp.json());
        rej(false);
      }
    });
  });
}
