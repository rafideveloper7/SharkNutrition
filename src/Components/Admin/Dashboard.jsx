import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-blue-400 rounded-lg p-4 lg:p-6 text-black shadow-lg">
          <div className="flex items-center">
            <div className="bg-gray-500 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-users text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold">1,234</p>
              <p className="text-sm lg:text-base">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-green-400 rounded-lg p-4 lg:p-6 text-black shadow-lg">
          <div className="flex items-center">
            <div className="bg-gray-500 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-shopping-cart text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold">567</p>
              <p className="text-sm lg:text-base">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-400 rounded-lg p-4 lg:p-6 text-black shadow-lg">
          <div className="flex items-center">
            <div className="bg-purple-500 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-box text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold">89</p>
              <p className=" text-sm lg:text-base">Total Products</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 rounded-lg p-4 lg:p-6 text-black shadow-lg">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-money-bill text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold">Rs 1,234,45</p>
              <p className=" text-sm lg:text-base">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-gray-800 rounded-lg p-4 lg:p-6 text-white shadow-lg">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <p className="font-semibold text-sm lg:text-base">#ORD-001</p>
                <p className="text-xs lg:text-sm text-gray-300">John Doe</p>
              </div>
              <span className="text-green-400 font-bold text-sm lg:text-base">Rs 6,200</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <p className="font-semibold text-sm lg:text-base">#ORD-002</p>
                <p className="text-xs lg:text-sm text-gray-300">Jane Smith</p>
              </div>
              <span className="text-green-400 font-bold text-sm lg:text-base">Rs 1,800</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 lg:p-6 text-white shadow-lg">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-700 rounded">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user text-white text-sm lg:text-base"></i>
              </div>
              <div>
                <p className="font-semibold text-sm lg:text-base">Mike Johnson</p>
                <p className="text-xs lg:text-sm text-gray-300">mike@example.com</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700 rounded">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user text-white text-sm lg:text-base"></i>
              </div>
              <div>
                <p className="font-semibold text-sm lg:text-base">Sarah Wilson</p>
                <p className="text-xs lg:text-sm text-gray-300">sarah@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}