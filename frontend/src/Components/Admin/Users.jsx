import React from 'react';

export default function Users() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">Users Management</h1>
      
      <div className="mb-4 lg:mb-6 flex flex-col sm:flex-row gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm lg:text-base">
          Export Excel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base">
          Export Text
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">ID</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">Name</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">Email</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base hidden sm:table-cell">Phone</th>
              <th className="p-3 lg:p-4 text-left text-sm lg:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600 hover:bg-gray-700 transition-colors">
              <td className="p-3 lg:p-4 text-sm lg:text-base">USR-001</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base">John Doe</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base">john@example.com</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base hidden sm:table-cell">+1234567890</td>
              <td className="p-3 lg:p-4">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <button className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                    Delete
                  </button>
                  <button className="bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700">
                    Edit
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-600 hover:bg-gray-700 transition-colors">
              <td className="p-3 lg:p-4 text-sm lg:text-base">USR-002</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base">Jane Smith</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base">jane@example.com</td>
              <td className="p-3 lg:p-4 text-sm lg:text-base hidden sm:table-cell">+0987654321</td>
              <td className="p-3 lg:p-4">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <button className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                    Delete
                  </button>
                  <button className="bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700">
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}