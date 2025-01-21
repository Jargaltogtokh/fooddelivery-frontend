import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { setgid } from "process";
import { useState, useEffect } from "react";
import { CategoryType } from "../page";

export default function CategoryUser({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <>
      <div className="ml-10 h-32">
        <div className="flex font-bold gap-1 ml-5 text-white">Categories</div>
        <div className="flex gap-1 ml-5 flex-wrap">
          {categories.map((category) => (
            <Link key={category._id} href={`/user/food/${category._id}`}>
              <Badge variant="outline" className="bg-white text-black">
                {category.categoryName}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
