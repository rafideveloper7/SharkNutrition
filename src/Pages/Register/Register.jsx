// src/pages/Register.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userName || !email || !password || !confirmPassword) {
      alert("Please fill the form completely")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    //  get all registered users or create empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // check if user already exist 
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      alert("User already exists with this email")
      return
    }

    // store new user data
    const newUser = {
      userName,
      email,
      password,
      wishlist: [] // make array to store wishlist items with user
    }

    // push new user in users array
    users.push(newUser)

    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("user", JSON.stringify(newUser))

    alert("Registration successful")
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center bg-black text-white px-4 mt-8">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Create Account</h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign up to have full control
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register