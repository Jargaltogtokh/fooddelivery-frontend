"use client";

import React, { useState, useEffect } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import CategoryUser from "./_components/categories";
import { Section } from "./_components/section1";

export type CategoryType = { categoryName: string; _id: string };

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8001/food-category");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-[#404040]">
        <CategoryUser categories={categories} />
        <div>
          {categories
            .filter((cat) =>
              [
                "Appetizers",
                "Salads",
                "Lunch favorites",
                "Main dishes",
              ].includes(cat.categoryName)
            )
            .map((category) => (
              <Section key={category._id} category={category} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
