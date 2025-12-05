import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ReviewSection({
  reviews: initialReviews = [],
  productId,
  onReviewAdded,
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // Autofill name & email if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => {
        if (prev.name !== user.fullName || prev.email !== user.email) {
          return { ...prev, name: user.fullName, email: user.email };
        }
        return prev;
      });
    }
  }, [user]);

  // Handle input (only message editable)
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-fetch user from localStorage to ensure we have the latest data
    const currentUser = localStorage.getItem("user");
    const userData = currentUser ? JSON.parse(currentUser) : null;

    if (!userData)
      return toast.error("You must be logged in to submit a review");
    if (!rating) return toast.error("Please select a rating");

    const userId = userData._id || userData.id;
    if (!userId) {
      console.error("User data:", userData);
      return toast.error("Invalid user data - missing user ID");
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId,
          name: userData.fullName || "",
          email: userData.email || "",
          message: form.message,
          rating,
        }),
      });
      console.log("User from localStorage:", user);
      const data = await res.json();
      if (!data.success)
        throw new Error(data.error || "Failed to submit review");

      setReviews([data.review, ...reviews]);
      setForm((prev) => ({ ...prev, message: "" }));
      setRating(0);

      if (onReviewAdded && data.updatedProduct) {
        onReviewAdded(data.updatedProduct);
      }
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Render stars
  const RenderStars = ({ count }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
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
                    className={`w-7 h-7 transition ${
                      (hover || rating) >= index
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
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-5 shadow-[0_0_15px_#37b5fe40]"
        >
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              disabled={!!user}
              className="bg-black/20 border border-gray-700 rounded-lg p-2 text-white focus:border-[#37b5fe] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled={!!user}
              className="bg-black/20 border border-gray-700 rounded-lg p-2 text-white focus:border-[#37b5fe] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Review Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleInput}
              required
              rows={4}
              className="bg-black/20 border border-gray-700 rounded-lg p-2 text-white focus:border-[#37b5fe] outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={!user || submitting}
            className="bg-[#37b5fe] text-black font-semibold px-6 py-2 rounded-xl transition hover:scale-105 shadow-[0_0_15px_#37b5fe]"
          >
            {submitting
              ? "Submitting..."
              : !user
              ? "Login to review"
              : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
}
