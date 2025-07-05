'use client';

import { logOut } from "@/utils/utils";
import { Button, Link } from "@heroui/react";
import { redirect } from "next/navigation";

export function Nav() {

  function handleClick() {
    logOut();
    redirect('/');
  }

  return (
    <div className="flex justify-between items-center bg-white px-5 py-3 rounded-2xl">
      <h2 className="font-bold text-2xl">NYT Best Sellers</h2>
      <div className="nav-links flex items-center gap-3">
        <Button
          className="font-medium" 
          href={'/my-collection'}
          as={Link}
        >
          Saved Books
        </Button>
        <Button color="primary" onPress={handleClick}>Sign Out</Button>
      </div>
    </div>
  );
}