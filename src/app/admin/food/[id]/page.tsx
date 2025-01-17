"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { setgid } from "process";
import { useState, useEffect } from "react";
import Category from "../../_components/Categories";
import AddButton from "../../_components/AddButton";
import AddButtonDialog from "../../_components/AddButton-1";

type FoodType = {
  name: string;
  _id: number;
  price: string;
  image: string;
  categoryId: string;
};

type Props = {
  params: {
    id: string;
  };
};

type CategoryType = {
  _id: number;
  categoryName: string;
};

export default function Page() {
  const params = useParams();

  const [name, setName] = useState<FoodType[]>([]);

  const [categoryName, setCategoryName] = useState<string>("");

  const addFood = async () => {
    const name = prompt("Enter new food to the category");
    if (!name) return;

    const response = await fetch(`http://localhost:8001/food`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setName((name) => [...name, data.newItem]);
  };

  useEffect(() => {
    const fetchCategoryName = async () => {
      const response = await fetch(
        `http://localhost:8001/food-category/${params.id}`
      );
      const data: CategoryType = await response.json();
      console.log(data);
      setCategoryName(data.categoryName);
    };
    fetchCategoryName();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8001/food?category=${params.id}`
      );
      const data = await response.json();
      setName(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Category />
      <div className="border outline-1 rounded-sm ml-10 h-80">
        <div className="flex font-bold gap-1 ml-5 mt-5">{categoryName}</div>

        <div className="flex ml-5 gap-1">
          <div className="border outline-dashed outline-red-500 rounded-sm h-[271px] w-[250px]">
            <AddButton />
          </div>
          {name.map((name) => (
            <div
              className="border outline-1 rounded-sm h-[271px] w-[250px]"
              key={name._id}
            >
              <div className="pb-2 text-red-500 font-medium">{name.name}</div>
              <div>{name.price}</div>
              <img src={name.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
