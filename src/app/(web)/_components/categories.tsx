import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Image from "next/image"; // Don't forget to import Image
import { CategoryType } from "../page";
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

export default function CategoryUser({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [foods, setFoods] = useState<FoodType[]>([]);

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
    if (selectedCategory) {
      const fetchFoods = async () => {
        try {
          const response = await fetch(
            `http://localhost:8001/food?category=${selectedCategory._id}`
          );
          const data = await response.json();
          setFoods(data);
        } catch (error) {
          console.error("Error fetching foods:", error);
        }
      };
      fetchFoods();
    }
  }, [selectedCategory]);

  return (
    <div className="ml-10 h-auto">
      {/* Categories */}
      <div className="flex font-bold gap-1 ml-5 text-white">Categories</div>
      <div className="flex gap-1 ml-5 flex-wrap">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer"
          >
            <Badge
              variant="outline"
              className="bg-white text-black hover:bg-red-500"
            >
              {category.categoryName}
            </Badge>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-10  data-[state=active]:bg-red-500">
          <div className="flex-wrap w-full ">
            <h2 className="font-bold mt-5 ml-5 text-white">
              {selectedCategory.categoryName}
            </h2>
            <div className="flex gap-5">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <div
                    key={food._id}
                    className="border bg-white rounded-md relative"
                    style={{
                      width: "250px",
                    }}
                  >
                    {food.image ? (
                      <Image
                        src={food.image}
                        alt={food.name}
                        width={250}
                        height={142.48}
                        className="rounded-lg mt-2 h-[142.48px]"
                      />
                    ) : (
                      <div className="bg-gray-700 w-full h-32 mb-2 rounded-md flex items-center justify-center">
                        <span className="text-white">No image</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-red-500">
                        {food.name}
                      </h3>
                      <p className="">${food.price}</p>
                    </div>
                    <p className="mt-5 font-5">{food.ingredients}</p>
                    <div className="absolute top-20 right-3">
                      <FoodCart food={food} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">
                  No foods available in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
