"use client";

import { useAuthRequest } from "@/hooks/auth";
import { useState, useEffect } from "react";

export const Foods = () => {
  const [foodOrderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [isLoading, data: foods] = useAuthRequest("food");
  
  if (isLoading) return <div> Loading ...</div>

  const addFoodToOrder = (food: Food) => {
    localStorage.setItem("orderItems", JSON.stringify([{food: food, quantity: 1}]));

    const oldValues = localStorage.getItem("orderItems");
    const oldOrderItems = oldValues ? JSON.parse(oldValues) : [];
    const oldFood = oldOrderItems.find(
      (item: OrderItem) => item.food._id === food._id
    );
    if (oldFood) {
      oldFood.quantity += 1;
    } else {
      oldOrderItems.push({
        food,
        quantity: 1,
      });
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4">
        {foods?.map((food)=> (
            <div className="flex justify-center p-2 border" key={food._id}>
                <FoodCart key={food._id} food={food} />
                <Button onClick={()= addFoodToOrder(food)}> +1</Button>

            </div>
        ))

        }
    
    </div>
  )
};
