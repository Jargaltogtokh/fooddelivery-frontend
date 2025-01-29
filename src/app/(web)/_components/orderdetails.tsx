import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divide, ShoppingCart } from "lucide-react";

type OrderItem = {
  food: { _id: string; foodName: string; price: number };
  quantity: number;
};

interface OrderSheetProps {
  onClose: () => void;
}

type Food = {
  name: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

export const OrderSheet = ({ onClose }: OrderSheetProps) => {
  const existingOrderString = localStorage.getItem("orderItems");
  const existingOrder = JSON.parse(existingOrderString || "[]");
  const [foodOrderItems, setOrderItems] = useState<OrderItem[]>(existingOrder);
  const [isOpen, setIsOpen] = useState(true);

  const onMinusOrderItem = (idx: number) => {
    const newOrderItems = foodOrderItems.map((orderItem, index) => {
      if (idx === index && orderItem.quantity > 1) {
        return {
          ...orderItem,
          quantity: orderItem.quantity - 1,
        };
      } else {
        return orderItem;
      }
    });
    setOrderItems(newOrderItems);
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
  };

  const onPlusOrderItem = (idx: number) => {
    const newOrderItems = foodOrderItems.map((orderItem, index) => {
      if (idx === index) {
        return {
          ...orderItem,
          quantity: orderItem.quantity + 1,
        };
      } else {
        return orderItem;
      }
    });
    setOrderItems(newOrderItems);
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
  };

  const removeButton = (idx: number) => {
    // Remove the item at the given index
    const newOrderItems = foodOrderItems.filter((_, index) => index !== idx);

    // Update the state and localStorage
    setOrderItems(newOrderItems);
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
  };
  useEffect(() => {
    const existingOrderString = localStorage.getItem("orderItems");
    const existingOrder = JSON.parse(existingOrderString || "[]");
    setOrderItems(existingOrder);
  }, [localStorage]);

  console.log({ foodOrderItems });

  return isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#404040] rounded-xl shadow-lg w-[535px] p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Tabs defaultValue="account" className="font-bold text-white w-full">
          <div className="flex gap-5">
            <ShoppingCart size={24}> Order Detail </ShoppingCart>
            <h2 className="text-lg text-center mb-4"> Order detail</h2>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="account"
              className="hover:bg-red-500 focus:bg-red-500  data-[state=active]:bg-red-500  data-[state=active]:text-white"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="hover:bg-red-500 focus:bg-red-500  data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Order
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>My cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* <div className="space-y-1">{existingOrder[0]?.food?.name}</div> */}
                <div className="space-y-1">
                  {foodOrderItems?.map((orderItem: any, idx: number) => (
                    <div
                      key={orderItem?.food?._id}
                      className="flex justify-between"
                    >
                      <div>
                        <img
                          className="h-[100px] w-[124px] rounded-lg object-cover"
                          src={orderItem?.food?.image}
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 w-full">
                        <div className="text-red-500">
                          {orderItem?.food?.name}
                        </div>
                        {/* <button onClick={removeButton}></button> */}
                        <div className="text-sm font-normal">
                          {orderItem?.food?.ingredients}
                        </div>

                        <div className="flex gap-2 text-sm font-normal justify-between">
                          <div className="flex gap-3">
                            <button onClick={() => onMinusOrderItem(idx)}>
                              -
                            </button>
                            <p className="font-bold">{orderItem?.quantity}</p>
                            <button onClick={() => onPlusOrderItem(idx)}>
                              +
                            </button>
                            <button
                              className="text-red-500 hover:underline mt-2"
                              onClick={() => removeButton(idx)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="font-bold">
                            ${orderItem?.food?.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-500 border rounded-lg w-full">
                  Add food
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Items</p>
                    <p>
                      $
                      {foodOrderItems
                        ?.reduce((total, orderItem) => {
                          return (
                            total + orderItem?.quantity * orderItem?.food?.price
                          );
                        }, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p>${0.99}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Total</p>
                    <p>
                      {" "}
                      $
                      {foodOrderItems
                        ?.reduce((total, orderItem) => {
                          return (
                            total +
                            orderItem?.quantity * orderItem?.food?.price +
                            0.99
                          );
                        }, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-500 border rounded-lg w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Order history</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <p></p>
                  <p></p>
                </div>
                <div className="space-y-1">
                  <p></p>
                  <p></p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
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
                    <p>$0.99</p>
                  </div>
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
  ) : null;
};
