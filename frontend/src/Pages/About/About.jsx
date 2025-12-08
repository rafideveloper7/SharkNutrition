import React from "react";
import TrustUs from "../../Components/CustomersTrust/TrustUs";

function About() {
  return (
    <>
      <div className=" w-[min(100%,calc(1320px-30px))] mx-auto flex flex-col md:flex-row justify-center p-6 md:p-10">
        {/* Left section: text */}
        {/* <div className="w-full md:w-1/2 p-4 md:p-10 text-center sm:m-2">
          <h1 className="max-w-[520px] text-[34px] font-bold leading-14 text-center mx-auto md:mx-0 mb-6">
            WHY CHOOSE SHARK NUTRITION
          </h1>
          <p className=" p-3 leading-11 text-[18px] text-center">
            Because We know that athletes and bodybuilders in Pakistan need real
            products and real results. With us, you get; A wide range of
            authentic supplements with unbeatable prices without compromising
            qaulity. Fast delivery with live tracking and 24/7 customer support.
          </p>
        </div> */}

        <div className="w-[75vw] md:w-1/2 p-4 md:p-10 text-center sm:m-2">
          <h1 className="max-w-[520px] text-[34px] font-bold leading-14 mb-6 text-center">
            About Shark Nutrition
          </h1>

          <p className="text-[16px] leading-7 mb-4">
            Welcome to SHARK NUTRITION. Our journey began when our founder, a
            passionate gym enthusiast, faced a challenge familiar to many
            athletes and fitness enthusiasts in Pakistan: finding reliable and
            authentic nutrition supplements. As a dedicated athlete, our founder
            understood the importance of fueling his body with the right
            nutrients to achieve his fitness goals.
          </p>

          <p className="text-[16px] leading-7 mb-4">
            However, with numerous supplement suppliers in the market, it was
            difficult to trust the authenticity and quality of the products. The
            risk of compromising his health was too great, and he knew he
            couldn't settle for anything less than the best. That's why, over
            two years ago, our founder made a decision to create a brand that
            would guarantee authenticity and quality. With a passion for health
            and wellness, and a drive to serve the fitness community, SHARK
            NUTRITION was born.
          </p>

          <p className="text-[16px] leading-7 mb-4">
            We're committed to providing our customers with the highest-quality
            nutrition supplements, sourced from reputable manufacturers and
            rigorously tested for authenticity and potency. Our team is
            dedicated to helping you achieve your fitness goals, whether you're
            a professional athlete, a fitness enthusiast, or someone looking to
            improve overall health.
          </p>

          <h2 className="text-[22px] font-semibold mt-6 mb-2">Our Mission</h2>
          <p className="text-[16px] leading-7 mb-4">
            Our mission is to empower individuals to take control of their
            health and wellness by providing access to authentic, high-quality
            nutrition supplements.
          </p>

          <h2 className="text-[22px] font-semibold mt-6 mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-[16px] leading-7 mb-4 text-left">
            <li>
              Authenticity: We guarantee the authenticity of every product we
              sell.
            </li>
            <li>
              Quality: We source our products from reputable manufacturers and
              test them rigorously.
            </li>
            <li>
              Customer-centricity: We provide exceptional customer service and
              support.
            </li>
            <li>
              Passion: We're committed to helping customers achieve their goals.
            </li>
          </ul>

          <h2 className="text-[22px] font-semibold mt-6 mb-2">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-[16px] leading-7 mb-4 text-left">
            <li>Authentic products</li>
            <li>Wide range of supplements</li>
            <li>Competitive pricing</li>
            <li>Excellent customer service</li>
          </ul>

          <p className="text-[16px] leading-7 mt-4">
            Thank you for choosing SHARK NUTRITION. We're honored to be your
            partner in health and wellness.
          </p>
        </div>

        {/* Right section: image grid */}
        <div className=" md:w-1/2 flex  mt-6 m-auto text-center">
          {/* Right column: card + last image */}
          <div className="w-[100%] h-full  flex flex-col gap-4  m-auto p-5">
            <div className="w-full text-left rounded-lg bg-[#2E6BC6] flex flex-col justify-center items-center p-4">
              <p className="text-[#ffffffcc] text-[14px] leading-6 mb-16">
                Aiming to make sure that our customers avail genuine, authentic
                and original supplements at fair rates. Providing gifts with
                each order to encourage a fit lifestyle.
              </p>
              <div className="w-full text-left border-t p-2">
                {/* <h4 className="text-[18px]  text-[#ffffff] font-semibold leading-6 mb-1">
                  Gohar Zaman
                </h4> */}
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
