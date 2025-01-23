import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-black w-full h-[655px] mb-0 pt-10">
      {/* Red Section with 10px Top Margin */}
      <div className="bg-red-500 w-full h-[62px] flex gap-20 items-center">
        <p className="text-white text-lg animate-marquee">
          Fresh fast delivered
        </p>
        <p className="text-white text-lg animate-marquee">
          Fresh fast delivered
        </p>
        <p className="text-white text-lg animate-marquee">
          Fresh fast delivered
        </p>
        <p className="text-white text-lg animate-marquee">
          Fresh fast delivered
        </p>
        <p className="text-white text-lg animate-marquee">
          Fresh fast delivered
        </p>
      </div>

      {/* Logo Section */}

      <div className="grid grid-cols-5 gap-4 pt-20">
        <div className="flex justify-start pl-10">
          <img src="LogoFooter.png" className="w-[88px] h-[93.7px]" />
        </div>
        <div className="col-start-2 ... ">
          <div className="text-gray-500 pb-3"> NOM NOM </div>
          <a href="http://localhost:3000/">
            <div className="text-white pb-3"> Home </div>
          </a>
          <a href="/contact" className="text-white">
            {" "}
            <div className="pb-3"> Contact us</div>
          </a>
          <div className="text-white pb-3"> Delivery zone </div>
        </div>
        <div className="col-start-3 ... text-white">
          <div className="text-gray-500 pb-3"> MENU </div>
          <div className="text-white pb-3"> Appetizers </div>
          <div className="text-white pb-3"> Salads </div>
          <div className="text-white pb-3"> Pizzas </div>
          <div className="text-white pb-3"> Main dishes </div>
          <div className="text-white pb-3"> Desserts </div>
        </div>
        <div className="col-start-4 ... text-white">
          {" "}
          <div className="text-black pb-3"> MENU </div>
          <div className="text-white pb-3"> Side dish </div>
          <div className="text-white pb-3"> Brunch </div>
          <div className="text-white pb-3"> Desserts </div>
          <div className="text-white pb-3"> Beverages </div>
          <div className="text-white pb-3"> Fish & Sea foods </div>
        </div>
        <div className="col-start-5 ... text-white">
          {" "}
          <div className="text-gray-500 pb-3"> FOLLOW US </div>
          <div className="flex gap-10">
            <a href="http://www.facebook.com">
              <img src="FBB.png" alt="" className="h-[28px] w-[28px]" />
            </a>
            <a href="http://www.instagram.com">
              <img src="Instagram.png" alt="" className="h-[28px] w-[28px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
