import { useState } from "react"

function AdminLogin({ setIsLoggedIn }) {
    const token = "12121212"
    const [message, setMessage] = useState("")
    function handleLogin(e){
        e.preventDefault()
        const password = e.target.password.value
        
        if(!password) return setMessage("Please fill the field")
        if(password !== token) return setMessage("Incorrect Password!")
        if(password == token) return setIsLoggedIn(true)
    }
    return (
        <section id="adminLogin" className="bg-black fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
                <p className="text-center text-gray-400 mb-8 text-sm">
                    Enter password to login admin pannel.
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="password" className="block text-gray-300 mb-2 text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        />
                    <p className="text-xs ps-1 mt-1 text-red-400">{message}</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AdminLogin