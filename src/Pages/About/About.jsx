import React from "react";
import ownerImgOne from "../../assets/abdullah-1.webp";
import ownerImgTwo from "../../assets/abdullah-2.webp";
import ownerImgThree from "../../assets/abdullah-3.webp";
import TrustUs from "../../Components/CustomersTrust/TrustUs";

function About() {
  return (
    <>
      <div className=" w-[min(100%,calc(1320px-30px))] mx-auto flex flex-col md:flex-row justify-center p-6 md:p-10">
        {/* Left section: text */}
        <div className="w-full md:w-1/2 p-4 md:p-10 text-center sm:m-2">
          <h1 className="max-w-[520px] text-[34px] font-medium leading-14 text-center mx-auto md:mx-0 mb-6">
            WHY CHOOSE <span className="text-blue-400 text-5xl ">SHARK</span> NUTRITION
          </h1>
          <p className=" p-3 leading-11 text-[18px] text-center">
            Because We know that athletes and bodybuilders in Pakistan need real
            products and real results. With us, you get; A wide range of
            authentic supplements with unbeatable prices without compromising
            qaulity. Fast delivery with live tracking and 24/7 customer support.
          </p>
        </div>

        {/* Right section: image grid */}
        <div className="w-[95vw] h-[60vh] md:w-1/2 flex gap-4 mt-6 m-auto text-center">
          {/* Right column: card + last image */}
          <div className="w-[90%] h-full  flex flex-col gap-4  m-auto p-5">
            <div className="w-full text-left rounded-lg bg-[#2E6BC6] flex flex-col justify-center items-center p-4">
              <p className="text-[#ffffffcc] text-[14px] leading-6 mb-16">
                Aiming to make sure that our customers avail genuine, authentic
                and original supplements at fair rates. Providing gifts with
                each order to encourage a fit lifestyle.
              </p>
              <div className="w-full text-left border-t p-2">
                <h4 className="text-[18px]  text-[#ffffff] font-semibold leading-6 mb-1">
                  Gohar Zaman
                </h4>
                <p className="text-[14px] text-[#ffffff] leading-7 mb-3">
                  Founder - Shark Nutrition
                </p>
                <span className="ml-[40%] text-center inline-flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition mx-auto">
                  <i className="fa-brands fa-instagram text-[24px] text-center"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrustUs />
    </>
  );
}

export default About;
