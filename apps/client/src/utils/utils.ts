import { NytOverview } from '@interfaces/NytOverview.interface';

export function logOut() {
  window.alert('log out.');
}

export function getNytBestSellersData(): Promise<NytOverview> {
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/nyt-data`
    ).then((resp) => {
      if(resp.ok){
        res(resp.json())
      }else{
        rej(resp);
      }
    })
  })
}

export function getBookByIsbn(isbn: string){
  return new Promise((res, rej) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/book/${isbn}`
    ).then((resp) => {
      if(resp.ok){
        res(resp.json());
      }else{
        rej(resp);
      }
    })
  })
}