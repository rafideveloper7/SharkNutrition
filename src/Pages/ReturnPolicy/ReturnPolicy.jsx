import React from 'react'
import returnHeader from "../../assets/return-header.webp"

function ReturnPolicy() {
  return (
    <div>
      {/* Header Section */}
      <div
  className="relative w-full h-[180px] sm:h-[220px] md:h-[300px] bg-cover bg-center sm:bg-[center_top] md:bg-center flex items-center justify-center"
  style={{ backgroundImage: `url(${returnHeader})` }}
>
  <div className="absolute inset-0 bg-black/60"></div>
  <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center z-10 px-2 leading-snug">
    Return & Refund Policy
  </h1>
</div>


      {/* Content Section */}
      <div className="w-full max-w-5xl mx-auto py-12 px-6 sm:px-4">
        <h2 className="text-2xl sm:text-xl font-semibold text-center mb-8">
          Return & Refund Policy
        </h2>

        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-6">
          At Protonic Nutrition, we aim to provide our customers with 100% authentic, sealed, and high-quality supplements.
          Please read this Returns & Refunds Policy carefully before making any purchase.
          By placing an order with us, you agree to the terms outlined below.
        </p>

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">
          1. No Returns on Opened or Used Products
        </h3>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-4">
          For hygiene, safety, and authenticity reasons, we do not accept returns of any opened, used, or tampered products.
          Once the seal is broken or the packaging is opened, no refunds or exchanges will be entertained.
        </p>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">
          2. Eligible Returns (Unopened Products Only) ✔️
        </h3>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-2">
          A product may only be eligible for return if:
        </p>
        <ul className="list-disc ml-6 text-gray-400 text-base sm:text-sm space-y-2">
          <li>The product is unopened and in its original manufacturer-sealed packaging.</li>
          <li>The return request is made within 3 days of delivery.</li>
        </ul>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">3. Return Process</h3>
        <ul className="list-disc ml-6 text-gray-400 text-base sm:text-sm space-y-2">
          <li>Contact our support team with your order number and reason for return.</li>
          <li>Once approved, you’ll be provided with return shipping instructions.</li>
          <li>Returned products must reach us in original condition within 7 working days.</li>
        </ul>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">4. Refund Timeline</h3>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-4">
          After receiving and inspecting the returned product, we’ll initiate the refund within 5–7 business days.
          Refunds are processed using the same payment method used for the purchase.
        </p>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">5. Non-Returnable Products ❌</h3>
        <ul className="list-disc ml-6 text-gray-400 text-base sm:text-sm space-y-2">
          <li>Products purchased during sales or discounts.</li>
          <li>Products damaged due to mishandling after delivery.</li>
          <li>Free samples or promotional items.</li>
        </ul>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">6. Health & Safety Disclaimer ⚠️</h3>
        <ul className="list-disc ml-6 text-gray-400 text-base sm:text-sm space-y-2">
          <li>Some supplements may not be FDA-approved and are sold only for personal use.</li>
          <li>Certain pre-workouts and fat burners may contain stimulants restricted in some countries.</li>
          <li>By purchasing and using these products, you accept full responsibility for ensuring compliance with local laws.</li>
          <li>Consult your doctor before use if you have any health conditions.</li>
          <li>Pregnant or nursing women should not consume stimulant-based supplements.</li>
          <li>Protonic Nutrition is not liable for allergic responses or legal consequences from restricted products.</li>
        </ul>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">7. Order Cancellation 🚳</h3>
        <ul className="list-disc ml-6 text-gray-400 text-base sm:text-sm space-y-2">
          <li>Orders can be canceled only if they haven’t been processed or shipped.</li>
          <li>Once dispatched, cancellation requests will not be accepted.</li>
        </ul>

        <hr className="border-gray-700 my-6" />

        <h3 className="text-lg sm:text-base font-semibold mt-6 mb-2">8. Contact Us</h3>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-2">
          For returns, refunds, or inquiries:
        </p>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-2">
          Email: info@protonicnutrition.pk
        </p>
        <p className="text-gray-400 text-base sm:text-sm leading-relaxed mb-2">
          Instagram: @protonicnutrition.pk
        </p>

        <hr className="border-gray-700 my-6" />

        <p className="text-gray-400 text-base sm:text-sm leading-relaxed">
          Protonic Nutrition reserves the right to update or modify this policy at any time without prior notice.
          Please review this page regularly for the latest updates.
        </p>
      </div>
    </div>
  )
}

export default ReturnPolicy
