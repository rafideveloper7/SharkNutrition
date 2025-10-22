import React from "react";
import ownerImg from "../../assets/owner-img.webp";

function About() {
  return (
    <>
      <section className="bg-white text-black flex justify-center">
        <div className="max-w-[45%] h-[70vh] m-8 border p-10">
          <p className="text-blue-400 leading-10 text-center">Some words about us</p>
          <h1 className="text-[45px] font-madium m-3 leading-15 text-center">
            Meet The Man Behind The Idea !
          </h1>
          <p className="leading-10 font-madium m-3 text-[20px]">
            Meet Abdullah Bin Mazhar, the visionary CEO behind Protonic
            Nutrition.
          </p>
          <p className="leading-10 font-madium m-3 text-[20px]">
            A computer scientist turned entrepreneur, Abdullah is not just a gym
            enthusiast but also a qualified nutritionist dedicated to educating
            others on supplement usage. Committed to empowering the youth of
            Pakistan,
          </p>
        </div>
        <div className="w-[100%] flex justify-center items-center flex-wrap">
          <div className="w-[250px] h-[300px]  bg-green-300 m-1 p-4 border-3">
            <img className="object-cover" src={ownerImg} alt="owner-img" />
          </div>
          <div className="flex flex-col items-center bg-blue-400 text-white w-[250px] h-[300px] m-1 p-4 border-3">
             <p className="m-1">Aiming to make sure that our customers avail genuine, authentic and original supplements in price rates beyond cheap. Providing gifts with each and every order</p>
             <h2 className="m-1">- Abdullah Mazher -</h2>
             <p className=" text-[13px]">Founder - Protonic Nutrition</p>
          </div>
          <div className="w-[250px] h-[300px]  bg-green-300 m-1 p-4 border-3">
            <img className="object-cover" src={ownerImg} alt="owner-img" />
          </div>
          <div className="w-[250px] h-[300px]  bg-green-300 m-1 p-4 border-3">
            <img className="object-cover" src={ownerImg} alt="owner-img" />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
