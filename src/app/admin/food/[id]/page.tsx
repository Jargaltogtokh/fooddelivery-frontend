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
import { EditButton } from "../../_components/EditButton";

type FoodType = {
  name: string;
  _id: number;
  price: number;
  image: string;
  ingredients: string;
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
  const [categories, setCategories] = useState<CategoryType[]>([]);

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
  console.log(name);
  return (
    <>
      <Category />
      <div className="border outline-1 rounded-sm ml-10">
        <div className="flex flex-wrap font-bold gap-1 ml-5 mt-5">
          {categoryName}
        </div>

        <div className="flex ml-5 gap-1 flex-wrap">
          <div className="border outline-dashed outline-red-500 rounded-sm h-[271px] w-[250px]">
            <AddButton />
          </div>
          {name.map((food) => (
            <div
              className="border outline-1 rounded-sm h-[271px] w-[250px] relative"
              key={food._id}
            >
              <img className="mt-2" src={food.image} />
              <EditButton food={food} />
              <div className="flex justify-between mt-2">
                <div className="pb-2 text-red-500 font-lg font-bold">
                  {food.name}
                </div>
                <div>${food.price}</div>
              </div>
              <div className="text-sm mt-2">{food.ingredients}</div>
            </div>
          ))}
          <div className="flex gap-1 ml-5 flex-wrap"></div>
        </div>
      </div>
    </>
  );
}
