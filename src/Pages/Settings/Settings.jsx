import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="w-full min-h-[60vh] flex justify-center items-center bg-black">
            <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#37b5fe] text-black font-semibold rounded-md 
                           hover:bg-[#1ea4ef] transition-all duration-200 shadow-md 
                           border border-[#37b5fe] active:scale-95"
            >
                Logout
            </button>
        </div>
    );
}

export default Settings;
