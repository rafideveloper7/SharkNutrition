// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill all fields')
      return
    }

    // get users array where users saved
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // check if intered data eqaul to exist user
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!existingUser) {
      alert('Invalid email or password')
      return
    }

    localStorage.setItem('user', JSON.stringify(existingUser))
    alert('Login successful')
    navigate('/')
  }

  return (
    <div className="h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign in to continue shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
