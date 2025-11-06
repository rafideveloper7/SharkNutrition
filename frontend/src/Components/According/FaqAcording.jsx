export default function FAQSection() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-[20px] md:text-3xl font-[500] text-center mb-10">
        Frequently asked questions
      </h2>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          Delivery charges for orders from the Online Shop?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          We offer nationwide delivery with charges based on your city and
          package weight. You’ll see the exact cost at checkout.
        </p>
      </details>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          How do I choose a supplement for me?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          Don’t worry — we’ve got you covered. Whatsapp us at 0304-6584342 and
          together we can choose the perfect supplement for you.
        </p>
      </details>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          Which courier service we use?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          We use trusted courier partners such as Leopards, TCS, and Call
          Courier.
        </p>
      </details>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          How to return a product?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          You can return unused, sealed products within 7 days of delivery.
          Contact customer service for a pickup.
        </p>
      </details>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          How do I authenticate a supplement?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          All our products are sourced directly from authorized distributors.
          You can verify authenticity by scanning the seal or contacting us.
        </p>
      </details>

      <details className="border-b py-4">
        <summary className="cursor-pointer font-medium text-[16px]">
          Where can I view my sales receipt?
        </summary>
        <p className="mt-2 text-gray-600 text-[15px]">
          Your receipt is emailed automatically after checkout. You can also
          access it from your account dashboard.
        </p>
      </details>
    </div>
  );
}
