import { getNytBestSellersData } from "@/utils/utils";

export async function BookList() {
  const data = await getNytBestSellersData();
  console.log(data);
  
  return (
    <div>
      { data.results.lists.map((list, index) => (
        <h4 key={index}>{list.list_name}</h4>
      )) }
    </div>
  );
}
