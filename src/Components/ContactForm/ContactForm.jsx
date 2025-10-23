import React from "react";

function ContactForm() {

    const onSubmit = (e) => {
        e.preventDefault();
        alert("form submited")
    }


  return (
    <>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-[20px] md:text-3xl font-[500] text-center mb-5">Contact Customer Support.</h1>
        <h4 className="text-center font-[500] mb-4">Fill The Form Below!</h4>
        <p className="mb-8 text-center text-gray-600">
          Contact Protonic Nutrition today for market competitive prices,
          authentic and original supplements.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-5 items-start">
          {/* Name */}
          <div className="w-full">
            <label className="text-[16px] font-bold block mb-2" htmlFor="name">Name:</label>
            <input
              className="border rounded w-full md:w-[300px] p-2"
              type="text"
              id="name"
              name="name"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-[16px] font-bold block mb-2" htmlFor="email">Email:</label>
            <input
              className="border rounded w-full md:w-[300px] p-2"
              type="email"
              id="email"
              name="email"
            />
          </div>

          {/* Mobile Number */}
          <div className="w-full">
            <label className="text-[16px] font-bold block mb-2" htmlFor="tel">Mobile Number:</label>
            <input
              className="border rounded w-full md:w-[300px] p-2"
              type="tel"
              id="tel"
              name="tel"
            />
          </div>

          {/* Subject Checkboxes */}
          <div className="w-full">
            <h4 className="text-[16px] font-bold mb-3">Subject</h4>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4 mr-2"
                />
                Order inquiry
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4 mr-2"
                />
                Return & Refund
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4 mr-2"
                />
                Supplement Inquiry
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="accent-blue-600 w-4 h-4 mr-2"
                />
                Other
              </label>
            </div>
          </div>

          {/* Message Box */}
          <div className="w-full">
            <label
              className="text-[16px] font-bold block mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="border rounded w-full h-32 p-2 resize-none"
              id="message"
              name="message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
