import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OrderItem = {
  food: {
    _id: string;
    name: string;
    price: number;
    image: string;
    ingredients: string;
  };
  quantity: number;
};

interface OrderSheetProps {
  onClose: () => void;
}

export const OrderSheet = ({ onClose }: OrderSheetProps) => {
  // Initialize order items from localStorage
  const [foodOrderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const existingOrderString = localStorage.getItem("orderItems");
    const existingOrder = JSON.parse(existingOrderString || "[]");
    setOrderItems(existingOrder);
  }, []);

  const updateOrderInLocalStorage = (newOrderItems: OrderItem[]) => {
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
    setOrderItems(newOrderItems); // Update state to reflect in the UI
  };

  const onMinusOrderItem = (idx: number) => {
    const newOrderItems = [...foodOrderItems];
    if (newOrderItems[idx].quantity > 1) {
      newOrderItems[idx].quantity -= 1;
      updateOrderInLocalStorage(newOrderItems);
    }
  };

  const onPlusOrderItem = (idx: number) => {
    const newOrderItems = [...foodOrderItems];
    newOrderItems[idx].quantity += 1;
    updateOrderInLocalStorage(newOrderItems);
  };

  const removeButton = (idx: number) => {
    const newOrderItems = foodOrderItems.filter((_, index) => index !== idx);
    updateOrderInLocalStorage(newOrderItems);
  };

  // Calculate total
  const calculateTotal = () => {
    return foodOrderItems
      .reduce(
        (total, orderItem) => total + orderItem.quantity * orderItem.food.price,
        0
      )
      .toFixed(2);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#404040] rounded-xl shadow-lg w-[535px] p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Tabs defaultValue="cart" className="font-bold text-white w-full">
          <div className="flex gap-5 mb-4">
            <ShoppingCart size={24} />
            <h2 className="text-lg">Order Details</h2>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="cart"
              className="hover:bg-red-500 focus:bg-red-500 data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="hover:bg-red-500 focus:bg-red-500 data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle>My Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {foodOrderItems.map((orderItem, idx) => (
                  <div
                    key={orderItem.food._id}
                    className="flex justify-between items-center"
                  >
                    <img
                      className="h-[100px] w-[124px] rounded-lg object-cover"
                      src={orderItem.food.image}
                      alt={orderItem.food.name}
                    />
                    <div className="flex flex-1 flex-col justify-between ml-4 w-full">
                      <div className="flex justify-between">
                        <div className="text-red-500">
                          {orderItem.food.name}
                        </div>
                        <button
                          aria-label="Remove item"
                          className="text-red-500 border border-red-500 rounded-full p-1 font-bold text-xs pr-2 pl-2"
                          onClick={() => removeButton(idx)}
                        >
                          X
                        </button>
                      </div>
                      <div className="text-sm font-normal">
                        {orderItem.food.ingredients}
                      </div>
                      <div className="flex gap-2 justify-between">
                        <div className="flex gap-3">
                          <button onClick={() => onMinusOrderItem(idx)}>
                            -
                          </button>
                          <p className="font-bold">{orderItem.quantity}</p>
                          <button onClick={() => onPlusOrderItem(idx)}>
                            +
                          </button>
                        </div>
                        <div className="font-bold">
                          $
                          {(orderItem.quantity * orderItem.food.price).toFixed(
                            2
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-red-500 rounded-lg w-full"
                  onClick={() =>
                    (window.location.href = "http://localhost:3000/")
                  }
                >
                  Add Food
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <p className="text-gray-600">Items</p>
                  <p>${calculateTotal()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p>$0.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Total</p>
                  <p>${(parseFloat(calculateTotal()) + 0.99).toFixed(2)}</p>
                </div>
                <div className="space-y-1 mt-5">
                  <Label
                    htmlFor="name"
                    className="text-gray-600 text-md font-bold"
                  >
                    Address
                  </Label>
                  <Input id="name" defaultValue="" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-500 rounded-lg w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="order">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">No order history yet.</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <p className="text-gray-600">Items</p>
                  <p>$0.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p>$0.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Total</p>
                  <p>$1.98</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
