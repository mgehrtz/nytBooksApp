import { getAllLists } from '@/utils/utils';
import { Link } from '@heroui/react';

export default async function CategoryList() {
  const categories = await getAllLists();

  return (
    <div className='max-w-sm h-auto w-600px'>
      <div className='p-3 rounded-2xl m-3 bg-white sticky top-2.5 flex flex-col'>
        {/* <Link className='mb-2 border-2 hover:opacity-85 hover:bg-slate-200 rounded-full px-3 py-1 font-medium text-sm border-slate-200 text-black' href='/'>My Rated Books</Link> */}
        {categories.map((category) => (
          <Link className='mb-2 border-2 hover:opacity-85 hover:bg-slate-200 rounded-full px-3 py-1 font-medium text-sm border-slate-200 text-black' key={category.id} href={`/list/${category.id}`}>{category.title}</Link>
        ))}
      </div>
    </div>
  );
}