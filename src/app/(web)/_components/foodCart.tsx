"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FoodCartProps = {
  food: FoodType;
  onAddToCart?: (food: FoodType) => void;
};
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

const FoodCart: React.FC<FoodCartProps> = ({ food, onAddToCart }) => {
  // State to control the dialog open/close
  const [isOpen, setIsOpen] = useState(false);

  // Close the dialog
  const closeDialog = () => setIsOpen(false);

  // Open the dialog
  const openDialog = () => setIsOpen(true);

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={openDialog}>
          Add food
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{food.name}</DialogTitle>
          <DialogDescription>
            Add the food to your cart or make changes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Image
              src={food.image}
              alt={food.name}
              width={150}
              height={150}
              className="rounded-md object-cover"
            />
            <div className="col-span-3">
              <h2 className="text-lg font-semibold mt-2">{food.name}</h2>
              <p className="text-sm text-gray-600">{food.ingredients}</p>
              <p className="text-red-500 font-bold mt-1">${food.price}</p>

              <Button onClick={() => addFoodToOrder(food)}> +1</Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={closeDialog} // Close button works now
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodCart;
