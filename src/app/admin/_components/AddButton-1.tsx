"use client";

import { useState } from "react";
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

export default function AddButtonDialog() {
  const [food, setFood] = useState({
    name: "",
    price: "",
    image: "",
    ingredients: "",
    categoryId: "",
  });

  const submitModal = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
      method: "POST",
      body: JSON.stringify(food), // Send the whole food object here
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Food-delivery");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqc6hkkvs/upload`,
        { method: "POST", body: data }
      );
      const dataJson = await response.json();
      setFood((prev) => ({ ...prev, image: dataJson.secure_url }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Button to trigger the Dialog */}
      <div className="flex flex-col justify-center items-center mt-20">
        {/* Dialog Trigger now properly wraps the button */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="border p-1 rounded-full font-bold bg-red-500 text-xs pl-2 pr-2 h-10 w-10">
              +
            </button>
          </DialogTrigger>
          <p className="mt-5">Add new dish to the food category</p>

          {/* Dialog Content */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dish Info</DialogTitle>
              <DialogDescription>
                Please fill in the details for the new dish.
              </DialogDescription>
            </DialogHeader>

            {/* Form Content */}
            <div className="space-y-4">
              <div>
                <label>Dish Name</label>
                <input
                  type="text"
                  name="name"
                  value={food.name}
                  onChange={handleChange}
                  placeholder="Enter dish name"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Dish Category</label>
                <input
                  type="text"
                  name="categoryId"
                  value={food.categoryId}
                  onChange={handleChange}
                  placeholder="Enter category ID"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  value={food.ingredients}
                  onChange={handleChange}
                  placeholder="Enter ingredients"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={food.price}
                  onChange={handleChange}
                  placeholder="Enter dish price"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label>Image</label>
                <input
                  type="file"
                  onChange={handleUpload}
                  className="block w-full"
                />
                {food.image && <img src={food.image} alt="Food" width={100} />}
              </div>
            </div>

            {/* Dialog Footer with action buttons */}
            <DialogFooter>
              <Button variant="secondary">Close</Button>
              <Button
                onClick={() => {
                  submitModal();
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
