import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ShoppingCart, MapPin } from "lucide-react";

export default function Header() {
  const App = () => {
    return <ShoppingCart />;
  };

  return (
    <>
      <div className="flex w-full h-[68px] bg-black  justify-between">
        <img src="Logo.png" className="w-[146px] h-[46px] pl-20px" />
        {/* Spacer */}
        {/* <div className="flex-grow"></div> */}
        <div className="flex ml-2">
          <div className="flex w-[245px] h-[26px] rounded-xl bg-white mt-5 gap-2 items-center">
            <MapPin color="#d73333" />
            <p className="text-red-500 text-sm"> Delivery address: </p>
            <p className="text-sm"> Add location</p>
          </div>
          <div className="text-white ml-5 mr-4 mt-5 cursor-pointer">
            <ShoppingCart size={24} />
          </div>
          {/* Authentication Section */}
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
    </>
  );
}
