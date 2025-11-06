import React, { useState } from 'react'
const backendApi = import.meta.env.VITE_API_BASE

import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${backendApi}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Login failed')
        return
      }

    

      toast.success('Login successful')
localStorage.setItem("user", JSON.stringify(data));
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong while logging in')
    } finally {
      setLoading(false)
    }
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
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
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

export default Login;