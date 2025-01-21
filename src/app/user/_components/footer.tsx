export default function Footer() {
  return (
    <div className="bg-black w-full h-[755px] mb-0">
      {/* Red Section with 10px Top Margin */}
      <div className="bg-red-500 w-full h-[36px] flex overflow-hidden">
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
      <div className="flex justify-start">
        <img src="Logo.png" className="w-[146px] h-[46px]" />
      </div>
    </div>
  );
}
