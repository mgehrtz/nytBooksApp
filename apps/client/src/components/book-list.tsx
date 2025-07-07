'use client'

import { Book as BookType } from "@/types/interfaces/book.interface";
import { Book } from "./book";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import debounce from 'lodash.debounce';

export function BookList({ books, listName, listId } : { books: BookType[], listName: string, listId: number }) {

  const [ queryString, setQueryString ] = useState("");
  const [ filteredItems, setFilteredItems ] = useState(books);

  useEffect(() => {
    const searchString = queryString.toLowerCase();
    const items = books.filter(
      (b) => (
        b.author.toLowerCase().includes(searchString) ||
        b.title.toLowerCase().includes(searchString) ||
        b.description.toLowerCase().includes(searchString)
      )
    );
    setFilteredItems(items);
  }, [books, queryString]);


  const handleSearch = debounce(
    (value: string) => setQueryString(value),
    100
  )
  
  return (
    <div className="flex flex-col mt-3">
      <Input type="text" name="searchbar" id="searchBar" fullWidth radius="full" placeholder="Search..." isClearable variant="bordered" onValueChange={handleSearch} />
      <div className="bg-white p-5 my-3 rounded-2xl w-75% mx-auto flex-1">
        <h4 className="text-3xl font-bold text-black mb-3">{ listName }</h4>
        <hr className="mb-3"></hr>
        { 
          filteredItems.map((book, bookIndex) => (
            <Book key={`list_${listId}_book_${book.id}`} rank={ bookIndex } book={ book } />
          ))
        }
      </div>
    </div>
  );
}
