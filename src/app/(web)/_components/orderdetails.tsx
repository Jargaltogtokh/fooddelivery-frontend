import { useState } from "react";
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

export const OrderSheet = () => {
  const existingOrderString = localStorage.getItem("orderItems");
  const existingOrder = JSON.parse(existingOrderString || "[]");
  const [foodOrderItems, setOrderItems] = useState<OrderItem[]>(existingOrder);

export const Order = ({ onClose }: { onClose: () => void }) => {
  return (
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
                <div className="space-y-1">{existingOrder[0]?.food?.name}</div>
                <div>
                  {" "}
                  {foodOrderItems?.map((orderItem: any) => (
                    <div key={orderItem?.food?._id}>
                      <div>{orderItem?.food?.foodName}</div>
                      <div>
                        <button>-</button>
                        <p>{orderItem?.quantity}</p>
                        <button>+</button>
                        </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
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
  );
};
