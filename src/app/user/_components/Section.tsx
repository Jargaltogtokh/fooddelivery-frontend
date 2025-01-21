"use client";

import { useState, useEffect } from "react";
import CategoryUser from "./categories";
import { useParams } from "next/navigation";
import Category from "@/app/admin/_components/Categories";

type FoodType = {
  name: string;
  _id: number;
  price: string;
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
  _id: string;
  categoryName: string;
};

export function Section({ category }: { category: CategoryType }) {
  const [name, setName] = useState<FoodType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = category?._id ? `?category=${category?._id}` : "";
      const response = await fetch(`http://localhost:8001/food${query}`);
      const data = await response.json();
      setName(data);
    };
    fetchData();
  }, [category?._id]);

  return (
    <>
      <div className="border outline-1 rounded-sm ml-10 h-80">
        <div className="flex font-bold gap-1 ml-5 mt-5">
          {category?.categoryName}
        </div>
        <div className="flex gap-[20px]">
          {name.map((name) => (
            <div
              className="border outline-1 rounded-sm h-[271px] w-[250px] bg-white"
              key={name._id}
            >
              <img className="mt-2" src={name.image} />
              <div className="flex justify-between mt-2">
                <div className="pb-2 text-red-500 font-lg font-bold">
                  {name.name}
                </div>
                <div>{name.price}</div>
              </div>
              <div className="text-sm mt-2">{name.ingredients}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
