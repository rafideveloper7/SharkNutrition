import React from "react";
import ownerImgOne from "../../assets/abdullah-1.webp";
import ownerImgTwo from "../../assets/abdullah-2.webp";
import ownerImgThree from "../../assets/abdullah-3.webp";
import TrustUs from "../../Components/CustomersTrust/TrustUs";

function About() {
  return (
    <>
      <div className=" w-[min(100%,calc(1320px-30px))] mx-auto flex flex-col md:flex-row justify-between p-6 md:p-10">
        {/* Left section: text */}
        <div className="w-full md:w-1/2 p-4 md:p-10 text-center">
          <p className="max-w-[520px] text-[14px] md:text-[15px] font-medium leading-7 text-center mx-auto md:mx-0">
            Some words about us
          </p>
          <h1 className="max-w-[520px] text-3xl sm:text-4xl md:text-5xl font-semibold my-3 leading-relaxed mx-auto md:mx-0">
            Meet The Man <br /> Behind The Idea!
          </h1>
          <p className="mb-4">
            Meet Abdullah Bin Mazhar, the visionary CEO behind Protonic
            Nutrition.
          </p>
          <p className="mb-4">
            A computer scientist turned entrepreneur, Abdullah is not just a gym
            enthusiast but also a qualified nutritionist dedicated to educating
            others on supplement usage. Committed to empowering the youth of
            Pakistan.
          </p>
          <p className="mb-4">
            Abdullah ensures that every product offered by Protonic Nutrition is
            rigorously authenticated, safe, and affordably priced.
          </p>
          <p className="mb-4">
            More than just a supplement store, Protonic Nutrition embodies a
            lifestyle focused on wellness and gains, integrating the latest in
            weight loss techniques to redefine what's possible for your health
            journey.
          </p>
          <p className="mb-4">
            With our customers as our top priority, we consider your well-being
            not just our business, but our duty.
          </p>
        </div>

        {/* Right section: image grid */}
        <div className="w-full md:w-1/2 flex gap-4 mt-6">
          {/* Left column: first two images */}
          <div className="w-full h-auto  hidden md:hidden lg:block  p-4 m-auto">
            <img
              className="rounded-md w-full mt-[16px]"
              src={ownerImgOne}
              alt="Abdullah"
            />
            <img
              className="rounded-md w-full mt-[16px]"
              src={ownerImgTwo}
              alt="Abdullah"
            />
          </div>

          {/* Right column: card + last image */}
          <div className="w-full  flex flex-col gap-4  m-auto">
            <div className="text-left rounded-lg bg-[#2E6BC6] flex flex-col justify-center items-center p-4">
              <p className="text-[#ffffffcc] text-[14px] leading-6 mb-16">
                Aiming to make sure that our customers avail genuine, authentic
                and original supplements at fair rates. Providing gifts with
                each order to encourage a fit lifestyle.
              </p>
              <div className="w-full text-left">
                <h4 className="text-[18px]  text-[#ffffff] font-semibold leading-6 mb-1">
                Abdullah Mazher
              </h4>
              <p className="text-[14px] text-[#ffffff] leading-7 mb-3">
                Founder - Protonic Nutrition
              </p>
              <span className="ml-[40%] text-center inline-flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition mx-auto">
                <i className="fa-brands fa-instagram text-[24px] text-center"></i>
              </span>
              </div>
            </div>
            <img
              className="rounded-md w-full sm:hidden md:block lg:block"
              src={ownerImgThree}
              alt="Abdullah"
            />
          </div>
        </div>
      </div>

      <TrustUs />
    </>
  );
}

export default About;
