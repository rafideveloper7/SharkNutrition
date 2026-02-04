// components/TextSlider.jsx
import Marquee from "react-fast-marquee";

function TextSlider() {
  return (
    <div className="w-full bg-blue-400 h-[30px] lg:h-[45px] overflow-hidden flex items-center">
      <Marquee speed={60} pauseOnHover gradient={false}>
        <div className="flex space-x-32">
          <span className="font-bold px-4">DIVE INTO AUTHENTICITY</span>
          <span className="font-bold px-4">15-DAY MONEY-BACK GUARANTEE</span>
          <span className="font-bold px-4">COD ALL OVER PAKISTAN</span>
        </div>
      </Marquee>
    </div>
  );
};

export default TextSlider;