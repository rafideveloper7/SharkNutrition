import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center fixed w-screen h-screen top-0 left-0 text-center bg-black z-1000000000">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                The page you’re looking for doesn’t exist. Redirecting to Home...
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Go Home Now
            </button>
        </div>
    );
}

export default NotFound;
