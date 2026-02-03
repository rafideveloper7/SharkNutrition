import React, { useState, useEffect, forwardRef } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import "./ReviewsSection.css"
const API_BASE = import.meta.env.VITE_API_BASE;

const ReviewSection = forwardRef(function ReviewSection(
  {
    reviews: initialReviews = [],
    productId,
    onReviewAdded,
  },
  reviewsRef
) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
const [image, setImage] = useState(null);

const handleFileChange = (e) => {
  setImage(e.target.files[0]);
};

  // get user once
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // autofill for logged-in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.fullName,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!rating) return toast.error("Please select a rating");

  const formData = new FormData();
  formData.append("productId", productId);
  formData.append("rating", rating);
  formData.append("message", form.message);

  if (user) {
    formData.append("userId", user._id || user.id);
    formData.append("name", user.fullName);
    formData.append("email", user.email);
  } else {
    if (!form.name || !form.email) return toast.error("Name and email are required");
    formData.append("name", form.name);
    formData.append("email", form.email);
  }

  if (image) formData.append("image", image);

  setSubmitting(true);
  try {
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      body: formData, // <-- send FormData
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to submit review");

    setReviews([data.review, ...reviews]);
    setForm((prev) => ({ ...prev, message: "" }));
    setRating(0);
    setImage(null);

    if (onReviewAdded && data.updatedProduct) onReviewAdded(data.updatedProduct);

    toast.success("Review submitted successfully");
  } catch (err) {
    toast.error(err.message);
  } finally {
    setSubmitting(false);
  }
};


  const RenderStars = ({ count }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-gray-500"
            }`}
        />
      ))}
    </div>
  );
  return (
    <section className="w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white max-w-6xl mx-auto">
      {/* Reviews */}
      <div className="order-1 lg:order-2 space-y-6">
        <h2 className="text-xl font-semibold text-[#37b5fe] uppercase tracking-wide mb-3">
          Customer Reviews
        </h2>
        {reviews.length === 0 && (
          <p className="text-gray-400">No reviews yet</p>
        )}

        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-[0_0_10px_#37b5fe40]"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{rev.name}</h4>
              <RenderStars count={rev.rating} />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {rev.message}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {new Date(rev.createdAt).toLocaleDateString()}
            </p>
            
 {rev.image && (
  <img
    src={rev.image.startsWith("http") ? rev.image : `${API_BASE}${rev.image}`}
    alt="Review"
    className="mt-2 max-h-40 rounded object-cover"
  />
)}

    
          </div>
        ))}
      </div>

      {/* Rating + Form */}
      <div className="order-2 lg:order-1 space-y-10 max-w-[500px]">
        {/* Star Rating */}
        <div>
          <h2 className="text-lg font-semibold text-[#37b5fe] mb-3 uppercase tracking-wide">
            Leave a Rating
          </h2>
          <div className="flex gap-2 mb-6">
            {[...Array(5)].map((_, i) => {
              const index = i + 1;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                >
                  <Star
                    className={`w-7 h-7 transition ${(hover || rating) >= index
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "fill-none stroke-gray-600"
                      }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Form */}
        <form id="reviews" ref={reviewsRef}
          onSubmit={handleSubmit}
          className="bg-white/5 rounded-xl space-y-5 max-w-[500px]"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleInput}
            disabled={!!user}
            placeholder="Name"
            className="w-full p-2 bg-black/20 border focus:border-blue-400 rounded outline-0"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleInput}
            disabled={!!user}
            placeholder="Email"
            className="w-full p-2 bg-black/20 border focus:border-blue-400 rounded outline-0"
          />



          <textarea
            name="message"
            value={form.message}
            onChange={handleInput}
            rows={4}
            placeholder="Your review"
            className="w-full p-2 bg-black/20 border focus:border-blue-400 rounded outline-0"
          />
          <input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="w-full p-2 bg-black/20 border focus:border-blue-400 rounded outline-0"
/>


  {/* <-- ADD IMAGE PREVIEW HERE */}
  {image && (
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="mt-2 max-h-32 rounded object-cover"
    />
  )}
          <button
            disabled={submitting}
            className="bg-[#37b5fe] text-black px-6 py-2 rounded"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
})

export default ReviewSection;