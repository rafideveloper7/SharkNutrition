import React, { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewSection() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    // Dummy initial reviews
    const [reviews, setReviews] = useState([
        { id: 1, name: "Ali Khan", rating: 5, message: "Excellent product! Loved the quality." },
        { id: 2, name: "Usman", rating: 4, message: "Very good, worth the price." },
        { id: 3, name: "Hamza", rating: 5, message: "Amazing experience, highly recommend!" },
    ]);

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            id: Date.now(),
            name: form.name,
            rating,
            message: form.message,
        };

        setReviews([newReview, ...reviews]);
        setForm({ name: "", email: "", message: "" });
        setRating(0);
        alert("Review added (dummy)");
    };

    const RenderStars = ({ count }) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < count ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-gray-500"}`}
                />
            ))}
        </div>
    );

    return (
        <section className="w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white max-w-6xl mx-auto">

            {/* Reviews (Top on mobile, Right on desktop) */}
            <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-xl font-semibold text-[#37b5fe] uppercase tracking-wide mb-3">Customer Reviews</h2>

                {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-[0_0_10px_#37b5fe40]">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{rev.name}</h4>
                            <RenderStars count={rev.rating} />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{rev.message}</p>
                    </div>
                ))}
            </div>

            {/* Rating + Form (Bottom on mobile, Left on desktop) */}
            <div className="order-2 lg:order-1 space-y-10 max-w-[500px]">

                {/* Star Rating Select */}
                <div>
                    <h2 className="text-lg font-semibold text-[#37b5fe] mb-3 uppercase tracking-wide">Leave a Rating</h2>
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
                                            : "fill-none stroke-gray-600"}
                                        `}
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
                            onChange={handleInput}
                            required
                            className="bg-black/20 border border-gray-700 rounded-lg p-2 text-white focus:border-[#37b5fe] outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-300 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInput}
                            required
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
                        className="bg-[#37b5fe] text-black font-semibold px-6 py-2 rounded-xl transition hover:scale-105 shadow-[0_0_15px_#37b5fe]"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </section>
    );
}
