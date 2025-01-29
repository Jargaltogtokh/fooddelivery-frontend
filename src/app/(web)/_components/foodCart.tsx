"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Food = {
  name: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

type FoodCartProps = {
  food: Food;
  onAddToCart?: (food: Food) => void;
};

const FoodCart: React.FC<FoodCartProps> = ({ food, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center w-60">
      <Image
        src={food.image}
        alt={food.name}
        width={150}
        height={150}
        className="rounded-md object-cover"
      />
      <h2 className="text-lg font-semibold mt-2">{food.name}</h2>
      <p className="text-sm text-gray-600">{food.ingredients}</p>
      <p className="text-red-500 font-bold mt-1">${food.price}</p>
      {onAddToCart && (
        <Button
          className="mt-2 bg-red-500 text-white"
          onClick={() => onAddToCart(food)}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default FoodCart;
