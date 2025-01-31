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
        <Button
          variant="outline"
          onClick={openDialog}
          className="border rounded-full text-red-500 bg-white pr-3 pl-3 hover:bg-red-500"
        >
          +
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[826px] max-h-[442px]">
        <DialogHeader className="sr-only">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full h-full">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={food.image}
              alt={food.name}
              width={377}
              height={364}
              className="rounded-md object-cover w-[377px] h-[364px]"
            />
            <div className="mt-2">
              <h2 className="text-red-500 text-2xl font-semibold mt-2">
                {food.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{food.ingredients}</p>
              <p className="mt-40">Total price</p>
              <p className="text-2xl font-bold">${food.price}</p>

              <Button className="w-full" onClick={() => addFoodToOrder(food)}>
                {" "}
                Add to cart
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                onClick={closeDialog} // Close button works now
              >
                Close
              </Button> */}
            </div>
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodCart;
