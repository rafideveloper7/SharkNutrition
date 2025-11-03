import React, { useState, useEffect } from 'react';
import { fetchDashboardStats, fetchAllOrders } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      const data = await fetchDashboardStats();
      setStats(data);

      const orderData = await fetchAllOrders();
      setOrders(orderData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-white text-center">
        Loading dashboard...
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-blue-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-users text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm lg:text-base font-medium">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-green-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-shopping-cart text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">
                {stats.totalOrders.toLocaleString()}
              </p>
              <p className="text-sm lg:text-base font-medium">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-box text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">
                {stats.totalProducts.toLocaleString()}
              </p>
              <p className="text-sm lg:text-base font-medium">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Cart Items</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? currentOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-600">
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">{order.address}</td>
                <td className="px-4 py-2">Rs {order.totalAmount}</td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {order.cartItems && order.cartItems.length > 0 ? (
                    order.cartItems.map((item, index) => (
                      <div key={index}>
                        <strong>{item.name}</strong> (x{item.count}) - Rs {item.price}
                      </div>
                    ))
                  ) : (
                    "No items"
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
