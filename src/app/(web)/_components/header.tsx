import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ShoppingCart, MapPin } from "lucide-react";
import { OrderSheet } from "./orderdetails";
import { useState } from "react";

export default function Header() {
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleCartClick = () => {
    setIsOrderVisible((prev) => !prev);
  };
  const onClose = () => {
    setIsOpen(false); // Close the modal by updating state
  };

  return (
    <>
      <div className="flex w-full h-[68px] bg-black justify-between">
        <img src="Logo.png" className="w-[146px] h-[46px] pl-20px" />
        <div className="flex ml-2">
          <div className="flex w-[245px] h-[26px] rounded-xl bg-white mt-5 gap-2 items-center">
            <MapPin color="#d73333" />
            <p className="text-red-500 text-sm"> Delivery address: </p>
            <p className="text-sm"> Add location</p>
          </div>
          <div className="text-white ml-5 mr-4 mt-5 cursor-pointer">
            <div
              className="text-white flex items-center cursor-pointer"
              onClick={handleCartClick}
            >
              <ShoppingCart size={24} />
            </div>
          </div>
          <div className="flex items-center text-white">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
      <img src="BG.png" className="w-full h-[570px]" alt="" />
      {isOrderVisible && (
        <OrderSheet onClose={() => setIsOrderVisible(false)} />
      )}
    </>
  );
}
