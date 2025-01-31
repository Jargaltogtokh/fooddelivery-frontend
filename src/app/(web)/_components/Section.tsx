"use client";

import { useState, useEffect } from "react";
import CategoryUser from "./categories";
import { useParams } from "next/navigation";
import Category from "@/app/admin/_components/Categories";
import { Button } from "@/components/ui/button";
import FoodCart from "./foodCart";

type FoodType = {
  name: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: string;
};
type OrderItem = {
  food: FoodType;
  quantity: number;
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

export function Section({ category }: { category: CategoryType }) {
  const [name, setName] = useState<FoodType[]>([]);

  const addFoodToOrder = (food: FoodType) => {
    const orderItems: OrderItem[] = JSON.parse(
      localStorage.getItem("orderItems") || "[]"
    );

    const existingItem = orderItems.find((item) => item.food._id === food._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      orderItems.push({ food, quantity: 1 });
    }

    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  };

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
      <div className="flex-wrap rounded-sm ml-10">
        <div className="flex font-bold gap-1 ml-5 mt-5 text-white">
          {category?.categoryName}
        </div>
        <div className="flex gap-[20px] flex-wrap">
          {name.map((name) => (
            <div
              className="relative border outline-1 rounded-sm mb-4 w-[250px] bg-white"
              key={name._id}
            >
              <img
                className="mt-2 w-[365.33px] h-[150px] rounded-lg"
                src={name.image}
              />
              <div className="flex justify-between mt-2">
                <div className="pb-2 text-red-500 font-lg font-bold">
                  {name.name}
                </div>
                <div>${name.price}</div>
              </div>
              <div className="text-sm mt-2">{name.ingredients}</div>
              {/* <Button onClick={}> <FoodCart/> </Button> */}
              <div className="absolute top-20 right-3">
                <FoodCart food={name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
