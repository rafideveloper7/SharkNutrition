import React, { useEffect, useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState([])     
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/getAllUsers`)
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await res.json()
        setUsers(data?.users || []) 
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div className="text-white p-4">Loading users...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">
        Users Management
      </h1>
{/* 
      <div className="mb-4 lg:mb-6 flex flex-col sm:flex-row gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm lg:text-base">
          Export Excel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base">
          Export Text
        </button>
      </div> */}

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">ID</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">Name</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">Email</th>
  
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id || index}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 lg:p-4 text-sm lg:text-base">{user._id}</td>
                  <td className="p-3 lg:p-4 text-sm lg:text-base">{user.fullName || 'N/A'}</td>
                  <td className="p-3 lg:p-4 text-sm lg:text-base">{user.email}</td>
                
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
