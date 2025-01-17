"use client";

import { useState } from "react";
import Category from "./Categories";

export default function AdminMenuPage() {
  const [food, setFood] = useState({
    name: "",
    price: "",
    image: "",
    ingredients: "",
    categoryId: "",
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqc6hkkvs/upload`,
        { method: "POST", body: data }
      );
      const dataJson = await response.json();
      setFood((prev) => ({ ...prev, image: dataJson.secure_url }));
    }
  };

  const addFood = async () => {
    await fetch(`http://localhost:8001/food`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ food }),
    });
  };

  return (
    <div>
      {/* <Category /> */}
      <div className="mt-8 bg-slate-200 p-4 rounded-lg">
        <div> NEW FOOD </div>
        <input type="file" onChange={handleUpload} />

        {food?.image && <img src={food?.image} alt="" />}
        <button className="bg-orange-400 p-2 mt-2 rounded-lg" onClick={addFood}>
          ADD NEW FOOD
        </button>
      </div>
    </div>
  );
}
