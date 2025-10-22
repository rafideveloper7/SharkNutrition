import React from "react";
import ownerImg from "../../assets/owner-img.webp";

function About() {
  return (
    <section className="w-[70vw] mx-auto bg-black text-white flex flex-wrap justify-between p-10">
      <div className="w-full md:w-[45%] m-8 mr-2 relative">
        <p className="text-blue-400 leading-8 text-center">
          Some words about us
        </p>
        <h1 className="text-[45px] font-medium my-3 text-center leading-tight">
          Meet The Man Behind The Idea!
        </h1>
        <p className="leading-8 font-medium my-3 text-[18px]">
          Meet Abdullah Bin Mazhar, the visionary CEO behind Protonic Nutrition.
        </p>
        <p className="leading-8 font-medium my-3 text-[18px]">
          A computer scientist turned entrepreneur, Abdullah is not just a gym
          enthusiast but also a qualified nutritionist dedicated to educating
          others on supplement usage. Committed to empowering the youth of
          Pakistan.
        </p>
        <div className="flex justify-center items-center gap-5 absolute bottom-0">
          <span>WhatsApp</span>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>X (twitter)</span>
          <span>LinkedIn</span>
        </div>
      </div>

      <div className="w-full md:w-[50%] flex flex-wrap justify-center gap-4">
        <div className="w-[250px] h-[300px] rounded-10">
          <img
            src={ownerImg}
            alt="owner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[250px]  flex flex-col items-center justify-center bg-blue-400 text-white p-4">
          <p className="text-center text-sm">
            Aiming to make sure that our customers avail genuine, authentic and
            original supplements at fair prices, providing gifts with every
            order.
          </p>
          <div className="text-center">
            <h2 className="font-semibold">- Abdullah Mazher -</h2>
            <p className="text-[13px]">Founder - Protonic Nutrition</p>
          </div>
        </div>

        <div className="w-[250px] h-[300px] rounded-10">
          <img
            src={ownerImg}
            alt="owner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[250px] h-[300px] rounded-10">
          <img
            src={ownerImg}
            alt="owner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
