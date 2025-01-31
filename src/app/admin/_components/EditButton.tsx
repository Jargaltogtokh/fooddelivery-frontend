import { useState } from "react";
import { Pencil } from "lucide-react";

type FoodType = {
  name: string;
  _id: number;
  price: number;
  image: string;
  ingredients: string;
  categoryId: string;
};

export function EditButton({ food }: { food: FoodType }) {
  const [editing, setEditing] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodType>(food);

  const openEditModal = () => setEditing(true);
  const closeModal = () => setEditing(false);

  const submitModal = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${selectedFood._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(selectedFood),
        }
      );

      if (response.ok) {
        alert("Food updated successfully!");
        setEditing(false);
      } else {
        alert("Failed to update food.");
      }
    } catch (error) {
      console.error("Error updating food:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food-delivery");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dqc6hkkvs/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setSelectedFood((prev) => ({ ...prev, image: data.secure_url }));
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image.");
      }
    }
  };

  return (
    <div>
      <button
        onClick={openEditModal}
        className="absolute top-24 right-4 text-red-500 border rounded-full bg-white pr-2 pl-2"
      >
        +
      </button>

      {editing && (
        <div
          style={{
            maxHeight: "600px",
            maxWidth: "400px",
            backgroundColor: "rgba(0, 0, 0.2)",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // This centers the modal
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
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
            <h2 className="font-bold">Edit Dish Info</h2>
            <label>Dish Name</label>
            <input
              type="text"
              name="name"
              value={selectedFood.name}
              onChange={handleChange}
              placeholder="Enter dish name"
              className="w-full p-2 border rounded"
            />

            <label>Category ID</label>
            <input
              type="text"
              name="categoryId"
              value={selectedFood.categoryId}
              onChange={handleChange}
              placeholder="Enter category ID"
              className="w-full p-2 border rounded"
            />

            <label>Ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={selectedFood.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients"
              className="w-full p-2 border rounded"
            />

            <label>Price</label>
            <input
              type="text"
              name="price"
              value={selectedFood.price}
              onChange={handleChange}
              placeholder="Enter dish price"
              className="w-full p-2 border rounded"
            />

            <label>Image</label>
            <input type="file" onChange={handleImageUpload} />
            {selectedFood.image && (
              <img
                src={selectedFood.image}
                alt="Preview"
                className="mt-2 w-full"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={submitModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
