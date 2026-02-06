// components/TextSlider.jsx
import Marquee from "react-fast-marquee";

function TextSlider() {
  return (
    <div className="w-full bg-blue-400 h-[30px] lg:h-[45px] overflow-hidden flex justify-around ">
      <Marquee speed={80} pauseOnHover gradient={false} className="overflow-hidden">
        <div className="flex gap-80 px-16 m-36 sm:m-18">
          <span className="font-bold">DIVE INTO AUTHENTICITY</span>
          <span className="font-bold">7-DAY MONEY-BACK GUARANTEE</span>
          <span className="font-bold">COD ALL OVER PAKISTAN</span>
        </div>
        <div className="flex gap-80 px-16 m-36 sm:m-18">
          <span className="font-bold">DIVE INTO AUTHENTICITY</span>
          <span className="font-bold">7-DAY MONEY-BACK GUARANTEE</span>
          <span className="font-bold">COD ALL OVER PAKISTAN</span>
        </div>
      </Marquee>
    </div>
  );
};

export default TextSlider;