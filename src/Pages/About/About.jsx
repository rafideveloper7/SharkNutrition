import React from "react";
import ownerImg from "../../assets/owner-img.webp";

function About() {
  return (
    <section className="w-full max-w-[1200px] mx-auto bg-black text-white flex flex-col md:flex-row justify-between p-6 md:p-10">

      {/* Left section: text */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <p className="text-blue-400 leading-8 text-center md:text-left">
          Some words about us
        </p>
        <h1 className="text-3xl md:text-5xl font-medium my-3 text-center md:text-left leading-tight">
          Meet The Man Behind The Idea!
        </h1>
        <p className="leading-8 font-medium my-3 text-[16px] md:text-[18px]">
          Meet Abdullah Bin Mazhar, the visionary CEO behind Protonic Nutrition.
        </p>
        <p className="leading-8 font-medium my-3 text-[16px] md:text-[18px]">
          A computer scientist turned entrepreneur, Abdullah is not just a gym
          enthusiast but also a qualified nutritionist dedicated to educating
          others on supplement usage. Committed to empowering the youth of
          Pakistan.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6 text-blue-400">
          <span>WhatsApp</span>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>X</span>
          <span>LinkedIn</span>
        </div>
      </div>

      {/* Right section: image grid */}
      <div className="w-full md:w-1/2 flex flex-wrap justify-center gap-4">
        <div className="w-[45%] sm:w-[40%] md:w-[48%] aspect-[4/5] rounded-lg overflow-hidden">
          <img src={ownerImg} alt="owner" className="w-full h-full object-cover" />
        </div>

        <div className="w-[45%] sm:w-[40%] md:w-[48%] flex flex-col items-center justify-center bg-blue-400 text-white p-4 rounded-lg">
          <p className="text-center text-sm md:text-base mb-2">
            Aiming to make sure that our customers avail genuine, authentic and
            original supplements at fair prices, providing gifts with every order.
          </p>
          <div className="text-center">
            <h2 className="font-semibold">- Abdullah Mazher -</h2>
            <p className="text-[13px]">Founder - Protonic Nutrition</p>
          </div>
        </div>

        <div className="w-[45%] sm:w-[40%] md:w-[48%] aspect-[4/5] rounded-lg overflow-hidden">
          <img src={ownerImg} alt="owner" className="w-full h-full object-cover" />
        </div>

        <div className="w-[45%] sm:w-[40%] md:w-[48%] aspect-[4/5] rounded-lg overflow-hidden">
          <img src={ownerImg} alt="owner" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export default About;
