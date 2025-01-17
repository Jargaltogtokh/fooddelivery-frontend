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

type CategoryType = { categoryName: String; _id: number };

export default function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const addCategory = async () => {
    const categoryName = prompt("Enter new category name");
    if (!categoryName) return;

    const response = await fetch("http://localhost:8001/food-category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ categoryName }),
    });

    const data = await response.json();
    setCategories((categories) => [...categories, data.newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8001/food-category");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="border outline-1 rounded-sm ml-10 h-32">
        <div className="flex font-bold gap-1 ml-5 mt-5">Dishes category</div>
        <div className="flex gap-1 ml-5 flex-wrap">
          {categories.map((category) => (
            <Link key={category._id} href={`/admin/food/${category._id}`}>
              <Badge variant="outline">{category.categoryName}</Badge>
            </Link>
          ))}
          <button
            className="border p-1 rounded-full font-bold bg-red-500 text-xs pl-2 pr-2"
            onClick={addCategory}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
