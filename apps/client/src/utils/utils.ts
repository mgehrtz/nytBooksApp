import { BestSellerList } from "@/types/interfaces/best-seller-list.interface";
import { Book } from "@/types/interfaces/book.interface";
import { Category } from "@/types/interfaces/category.interface";
import { Comment } from "@/types/interfaces/comment.interface";

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
        console.warn(await resp.json());
        rej(await resp.json());
      }
    })
  })
}

export function postComment(comment: Comment): Promise<boolean> {
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
        res(true);
      }else{
        console.warn(await resp.json());
        rej(false);
      }
    });
  });
}