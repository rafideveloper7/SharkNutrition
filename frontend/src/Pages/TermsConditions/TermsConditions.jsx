import React from 'react'
import termsHeader from "../../assets/return-header.webp"

function TermsConditions() {
  return (
    <div>
      {/* Header Section */}
      <div
        className="w-full h-[250px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${termsHeader})` }}
      >
        <h1 className="text-5xl sm:text-4xl md:text-5xl font-semibold text-white text-center">
          Terms & Conditions
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto py-10 px-5 text-gray-400">
        <p className="text-lg leading-relaxed mb-6">
          Disclaimer – Please Read Carefully<br />
          By accessing and using this website (Shark Nutrition), you agree to comply with and be bound by our Terms and Conditions.
          If you do not agree with these terms, you should immediately discontinue using our website and services.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          For detailed information on returns and refunds, please refer to our <strong>Refund Policy</strong>.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Overview</h2>
        <p className="text-lg leading-relaxed mb-6">
          Shark Nutrition is an independent retailer of health, fitness, and nutritional supplements based in Pakistan.
          Our commitment is to deliver 100% original, sealed, and authentic products sourced exclusively from reputable and authorized local distributors.
          We prioritize customer trust, transparency, and safety, ensuring that every product sold meets strict quality standards.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">No Affiliation, Endorsement, or Partnership</h2>
        <p className="text-lg leading-relaxed mb-6">
          Shark Nutrition is not affiliated with, not endorsed by, and does not represent any international brands or manufacturers whose products are displayed or sold on our website.
          This includes, but is not limited to:
        </p>
        <ul className="list-disc pl-8 text-lg mb-6">
          <li>Optimum Nutrition (ON)</li>
          <li>BSN, Isopure, MuscleTech, Dymatize, MusclePharm, Kevin Levrone, Signature Series, Kaged Muscle</li>
          <li>Condemned Labz, Insane Labz, Rule1 Protein, Terror Labz, BPI Sports, MuscleMeds, Cellucor, Fitness Authority, Quamtrax Nutrition, Applied Nutrition</li>
        </ul>
        <p className="text-lg leading-relaxed mb-6">
          All brand names, logos, and trademarks mentioned belong to their respective owners and are used strictly for descriptive purposes only.
          Their use does not imply any official affiliation, sponsorship, or endorsement.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Sourcing & Product Authenticity</h2>
        <p className="text-lg leading-relaxed mb-6">
          All products sold by Shark Nutrition are procured through lawful, legitimate, and authorized local suppliers in Pakistan.
          We do not import, manufacture, alter, tamper with, or relabel any products.
          Each product is shipped in its original manufacturer-sealed packaging and handled with strict quality control to maintain authenticity and integrity.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Trademark & Intellectual Property Notice</h2>
        <p className="text-lg leading-relaxed mb-6">
          All trademarks, logos, and brand images featured on this website are the exclusive property of their respective owners.
          Their inclusion on our platform is solely for identification purposes.
          Shark Nutrition claims no ownership rights over any third-party trademarks or brand names.
          Any reference to these brands is made only to describe the original products offered.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Fair Use Disclaimer</h2>
        <p className="text-lg leading-relaxed mb-6">
          Under applicable intellectual property laws, Shark Nutrition’s use of brand names, logos, and product images qualifies as nominative fair use.
          We use these identifiers only to inform customers about the authenticity, origin, and identity of the products being offered.
          No attempt is made to misrepresent ownership, partnership, or licensing agreements with any brand.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Customer Protection & Transparency</h2>
        <p className="text-lg leading-relaxed mb-6">
          We are committed to customer safety, trust, and satisfaction.
          If you have concerns about authenticity or suspect an issue with any product purchased from Shark Nutrition, contact us immediately.
          We will investigate your query and, if required, verify products directly with authorized distributors.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Limitation of Liability</h2>
        <p className="text-lg leading-relaxed mb-6">
          Shark Nutrition does not manufacture any products listed on this website and therefore cannot be held liable for:
        </p>
        <ul className="list-disc pl-8 text-lg mb-6">
          <li>Any adverse effects resulting from improper product usage.</li>
          <li>Manufacturer defects or product recalls.</li>
          <li>Misinterpretation of brand warranties or international guarantees.</li>
        </ul>
        <p className="text-lg leading-relaxed mb-6">
          Customers are encouraged to review product labels, usage instructions, and consult healthcare professionals before consumption.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Health & Safety Advisory</h2>
        <p className="text-lg leading-relaxed mb-6">
          Use all dietary supplements, including pre-workout products, strictly at your own risk.
          Some products may not be FDA-approved and are sold only for personal use.
          Certain pre-workout supplements may contain ingredients or stimulants that are restricted or illegal in some countries.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          By purchasing and using these products, you accept full responsibility for ensuring compliance with your local laws, regulations, and health guidelines.
          Shark Nutrition is not liable for any health issues, allergic reactions, or legal consequences resulting from the use of these products.
        </p>

        <ul className="list-disc pl-8 text-lg mb-6">
          <li>If you have heart-related issues, high blood pressure, diabetes, kidney problems, or cardiovascular conditions, do not consume pre-workout supplements without prior medical approval.</li>
          <li>Pregnant women and nursing mothers are strictly advised against using pre-workout or stimulant-based products.</li>
          <li>Supplements are not intended to diagnose, treat, cure, or prevent any disease.</li>
          <li>Always read the manufacturer’s instructions carefully and consult your healthcare provider before starting any supplement regimen.</li>
          <li>Keep all supplements out of reach of children.</li>
        </ul>

        {/* Section 9 */}
        <p className="text-lg leading-relaxed mb-6">
          By purchasing and consuming any products from Shark Nutrition, you agree and acknowledge that you are using these products voluntarily and at your own risk.
          Shark Nutrition shall not be held responsible for any side effects, adverse reactions, or health complications.
          You waive any right to initiate legal claims against Shark Nutrition arising from product usage.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-200">Contact Us</h2>
        <p className="text-lg leading-relaxed mb-6">
          For inquiries, verification, or complaints, contact us at:
        </p>
        <p className="text-lg leading-relaxed mb-6">
          <strong><span className='text-gray-200'>Email:</span></strong> sharknutrition.pk@gmail.com
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Shark Nutrition — your trusted retailer for authentic supplements in Pakistan.
          We are committed to transparency, product integrity, and customer safety.
        </p>
      </div>
    </div>
  )
}

export default TermsConditions
