import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Image from "next/image"; // Don't forget to import Image
import { CategoryType } from "../page";

type FoodType = {
  name: string;
  _id: number;
  price: string;
  image: string;
  ingredients: string;
  categoryId: string;
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
              className="bg-white text-black hover: bg-red-500"
            >
              {category.categoryName}
            </Badge>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-10">
          <div className="flex-wrap w-full ">
            <h2 className="font-bold mt-5 ml-5 text-white">
              {selectedCategory.categoryName}
            </h2>
            <div className="flex gap-5">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <div
                    key={food._id}
                    className="border bg-white rounded-md"
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
                        className="rounded-md mt-2"
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
                      <p className="">{food.price}</p>
                    </div>
                    <p className="mt-5 font-5">{food.ingredients}</p>
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
