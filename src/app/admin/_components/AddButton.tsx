"use client";

import { useState } from "react";

export default function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [food, setFood] = useState({
    name: "",
    price: "",
    image: "",
    ingredients: "",
    categoryId: "",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitModal = async () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
      method: "POST",
      body: JSON.stringify(food), // Send the whole food object here
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setIsOpen(false);
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <button
          className="border p-1 rounded-full font-bold bg-red-500 text-xs pl-2 pr-2 h-10 w-10 "
          onClick={openModal}
        >
          +
        </button>{" "}
        <p className="mt-5"> Add new dish to the food category </p>
      </div>
      {isOpen && (
        <div
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              margin: "10px",
              minWidth: "300px",
            }}
          >
            <h2 className="font-bold">Dish Info</h2>
            <label> Dish name </label>
            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
              placeholder="Enter dish name"
              className="w-full p-2 border rounded"
            />
            <div className="flex flex-col mt-4 space-y-4 flex-wrap">
              <div>
                <label> Dish category </label>
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
                <label> Ingredients </label>
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
                <label> Price </label>
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
                <label> Image </label>
                <input type="file" onChange={handleUpload} />
                {food.image && (
                  <img
                    src={food.image}
                    alt="Food"
                    width={100}
                    className="block w-full"
                  />
                )}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={closeModal}>Close</button>
                <button onClick={submitModal}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
