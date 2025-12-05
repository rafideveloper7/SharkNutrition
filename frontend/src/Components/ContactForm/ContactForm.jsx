import React, { useState } from "react";
import { submitContactForm } from "../../api";
import toast from "react-hot-toast";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    subjects: [],
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, value]
          : prev.subjects.filter((subj) => subj !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactForm(formData);
      toast.success(res.message || "Form submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        tel: "",
        subjects: [],
        message: "",
      });
    } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-[20px] md:text-3xl font-[500] text-center mb-5">
        Contact Customer Support.
      </h1>
      <h4 className="text-center font-[500] mb-4">Fill The Form Below!</h4>
      <p className="mb-8 text-center text-gray-400">
        Contact Shark Nutrition today for market competitive prices,
        authentic and original supplements.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-5 items-start">
        {/* Name */}
        <div className="w-full">
          <label className="text-[16px] font-bold block mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="border rounded w-full md:w-[300px] p-2"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="text-[16px] font-bold block mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="border rounded w-full md:w-[300px] p-2"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="w-full">
          <label className="text-[16px] font-bold block mb-2" htmlFor="tel">
            Mobile Number:
          </label>
          <input
            className="border rounded w-full md:w-[300px] p-2"
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>

        {/* Subject Checkboxes */}
        <div className="w-full">
          <h4 className="text-[16px] font-bold mb-3">Subject</h4>
          <div className="flex flex-wrap gap-4">
            {["Order inquiry", "Return & Refund", "Supplement Inquiry", "Other"].map(
              (subj) => (
                <label key={subj} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-4 h-4 mr-2"
                    value={subj}
                    checked={formData.subjects.includes(subj)}
                    onChange={handleChange}
                  />
                  {subj}
                </label>
              )
            )}
          </div>
        </div>

        {/* Message Box */}
        <div className="w-full">
          <label className="text-[16px] font-bold block mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="border rounded w-full h-32 p-2 resize-none"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
