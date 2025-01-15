"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { setgid } from "process";
import { useState, useEffect } from "react";

type FoodType = {
  name: String;
  _id: number;
  price: String;
  //   Image
  categoryId: { type: String };
};

type Props = {
  params: {
    id: string;
  };
};

export default function Page() {
  const params = useParams();

  const [name, setName] = useState<FoodType[]>([]);

  const addFood = async () => {
    const name = prompt("Enter new category name");
    if (!name) return;

    const response = await fetch(`http://localhost:8001/food`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setName((name) => [...name, data.newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8001/food?category=${params.id}`
      );
      const data = await response.json();
      setName(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {name.map((name) => (
        <Badge variant="outline" key={name._id}>
          {name.name}
        </Badge>
      ))}
    </div>
  );
}
