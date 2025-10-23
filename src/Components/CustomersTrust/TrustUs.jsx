import React from "react";

function TrustUs() {
  return (
    <div className="w-[min(100%,calc(1320px-30px))] mx-auto flex flex-col p-6 md:p-10">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center mx-auto">
        <p className="max-w-[520px] text-[14px] md:text-[15px] font-medium leading-7 text-center">
          Buyers trust us
        </p>
        <h1 className="text-[28px] sm:text-3xl md:text-4xl font-semibold pt-2 pb-2 text-center leading-snug">
          Our Strategy Is To Provide Our Customers With Quality Products
        </h1>
        <p className="max-w-[740px] text-sm sm:text-base mb-4 text-center px-2">
          Protonic Nutrition chooses authenticity and customer health over
          business. Ensuring that each and every single product of ours is
          100% genuine and authentic. We provide you with the best there is.
        </p>
        <p className="leading-7 text-center mb-4 px-2 text-sm sm:text-base">
          We at Protonic Nutrition make sure that you get your hands on the
          latest supplements from Protonic Nutrition. Not only do you save
          money, but you get genuine products at affordable rates with timely
          deliveries.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Card 1 */}
        <div className="sm:w-[30%] flex flex-col items-center p-3 rounded">
          <i className="fa-solid fa-truck-fast text-blue-500 text-3xl mb-2"></i>
          <h3 className="font-semibold text-lg mb-1 text-center">Fast Delivery</h3>
          <p className="text-center text-sm text-gray-400">
            Experience lightning-fast delivery like never before. Get your
            orders delivered swiftly, right to your doorstep.
          </p>
        </div>

        {/* Card 2 */}
        <div className="sm:w-[30%] flex flex-col items-center p-3 rounded">
          <i className="fa-solid fa-award text-blue-500 text-3xl mb-2"></i>
          <h3 className="font-semibold text-lg mb-1 text-center">Best Quality</h3>
          <p className="text-center text-sm text-gray-400">
            Elevate your wellness journey with our premium-grade supplements,
            crafted for exceptional quality and effectiveness.
          </p>
        </div>

        {/* Card 3 */}
        <div className="sm:w-[30%] flex flex-col items-center p-3 rounded">
          <i className="fa-solid fa-rotate-right text-blue-500 text-3xl mb-2"></i>
          <h3 className="font-semibold text-lg mb-1 text-center">Return Policy</h3>
          <p className="text-center text-sm text-gray-400">
            Shop with confidence knowing our hassle-free return policy ensures
            your satisfaction. We stand by the quality of our supplements,
            guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrustUs;
