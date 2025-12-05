import React from "react";
import { Star } from "lucide-react";

export default function RatingInCard({ rating = 0, reviews = 0 }) {

    const fullCount = Math.round(rating);
    const stars = Array.from({ length: 5 });

    return (
        <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
                {stars.map((_, i) => {
                    const active = i < fullCount;
                    return (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${active ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-gray-300"}`}
                            aria-hidden="true"
                        />
                    );
                })}
            </div>

            <span className="text-sm text-gray-600">({reviews})</span>
        </div>
    );
}
