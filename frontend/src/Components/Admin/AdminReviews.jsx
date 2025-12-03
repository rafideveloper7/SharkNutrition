import React, { useState } from "react";
import { Star, Trash2 } from "lucide-react";

export default function AdminReviews() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Ali Khan", rating: 5, message: "Excellent product! Loved the quality." },
        { id: 2, name: "Usman", rating: 4, message: "Very good, worth the price." },
        { id: 3, name: "Hamza", rating: 5, message: "Amazing experience, highly recommend!" },
    ]);

    // Delete function
    const deleteReview = (id) => {
        if (confirm("Are you sure you want to delete this review?")) {
            setReviews((prev) => prev.filter((rev) => rev.id !== id));
        }
    };

    return (
        <div className="w-full mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold text-white mb-6">Manage Reviews</h1>

            <div className="flex flex-wrap gap-5">
                {reviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="w-full max-w-[290px] bg-white/5 border border-white/10 p-5 rounded-xl shadow-[0_0_10px_#37b5fe40]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-[#37b5fe]">{rev.name}</h2>

                            <button
                                onClick={() => deleteReview(rev.id)}
                                className="text-red-400 hover:text-red-500 transition"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < rev.rating
                                            ? "fill-yellow-400 stroke-yellow-400"
                                            : "fill-none stroke-gray-500"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Message */}
                        <p className="text-gray-300 text-sm mt-3">{rev.message}</p>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <p className="text-gray-400 text-center mt-10">No reviews available.</p>
            )}
        </div>
    );
}
