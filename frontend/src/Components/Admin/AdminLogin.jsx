
import { useState } from "react"

function AdminLogin({ setIsLoggedIn }) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const username = e.target.username.value.trim()
    const password = e.target.password.value.trim()

    if (!username || !password)
      return setMessage("Please fill all fields")

    try {
      setLoading(true)
      setMessage("")

      //  Send login request to backend
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || "Invalid credentials")
        return
      }

      //  Save JWT token in localStorage
      localStorage.setItem("adminToken", data.token)
      localStorage.setItem("adminUsername", username)

      //  Mark user as logged in
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error)
      setMessage("Server error, please try again later")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="adminLogin" className="bg-black fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Admin Login</h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Enter your credentials to login admin panel.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-2 text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter admin username"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-xs ps-1 mt-1 text-red-400">{message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition duration-200 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin
