import React, { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH REVIEWS FROM DB
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/reviews/all`, {
        credentials: "include",
      });

      // Check if response is actually JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "API is not returning JSON. Check if /api/reviews endpoint exists."
        );
      }

      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      } else {
        setError(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      // Try parse JSON safely
      let data;
      try {
        data = await res.json();
      } catch {
        data = { success: res.ok }; 
      }

      if (data.success) {
        setReviews((prev) => prev.filter((rev) => rev._id !== id));
      } else {
        alert(data.message || "Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review: " + err.message);
    }
  };

  // On page load
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="w-full mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Manage Reviews</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
          <br />
          <small>
            Check console for details. Make sure /api/reviews endpoint exists.
          </small>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-gray-400 text-center mt-10">Loading reviews...</p>
      )}

      {/* Reviews Grid */}
      {!loading && reviews.length > 0 && (
        <div className="flex flex-wrap gap-5">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="w-full max-w-[290px] bg-white/5 border border-white/10 p-5 rounded-xl shadow-[0_0_10px_#37b5fe40]"
            >
              {/* Product Name */}
              {rev.productId?.name && (
                <p className="text-xs text-gray-500 mb-2">
                  Product: {rev.productId.name}
                </p>
              )}

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#37b5fe]">
                  {rev.name}
                </h2>
                <button
                  onClick={() => deleteReview(rev._id)}
                  className="text-red-400 hover:text-red-500 transition"
                  aria-label="Delete review"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "fill-none stroke-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-300 text-sm mt-3">{rev.message}</p>
              {rev.image && (
  <img
    src={rev.image.startsWith("http") 
      ? rev.image 
      : `${import.meta.env.VITE_API_BASE}${rev.image}`
    }
    alt="Review"
    className="mt-3 max-h-40 w-full object-cover rounded-lg"
  />
)}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-gray-400 text-center mt-10">No reviews available.</p>
      )}
    </div>
  );
}
