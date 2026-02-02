import React, { useState, useEffect } from 'react';
import { fetchDashboardStats, fetchAllOrders } from '../../api';
import CategoryList from '../admin/CategoryList'; // Category components import

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

  // Category toggle (optional UX)
  const [showCategories, setShowCategories] = useState(false);

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

      {/* Categories Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
        >
          {showCategories ? "Hide Categories" : "Manage Categories"}
        </button>
      </div>

      {/* Category Form + List */}
      {showCategories && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Category Management</h2>
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <CategoryList />
          </div>
        </div>
      )}

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
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Coupon Code</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Products</th>
              <th className="px-4 py-2 text-left">Servings</th>
              <th className="px-4 py-2 text-left">Flavor</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) =>
                order.cartItems.map((item, itemIndex) => (
                  <tr key={`${order._id}-${item.productId}-${itemIndex}`} className="border-b border-gray-600">
                    {itemIndex === 0 && (
                      <>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top min-w-32 border-r border-gray-700">{order.name}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top min-w-40 border-r border-gray-700">{order.email}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top border-r border-gray-700">{order.phone}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top min-w-50 border-r border-gray-700">{order.address}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top min-w-50 border-r border-gray-700"> Rs {order.discount || 0}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top min-w-50 border-r border-gray-700"> {order.couponCode || "-"}</td>

                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top border-r border-gray-700">Rs {order.totalAmount}</td>
                        <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top border-r border-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </>
                    )}
                    <td className="px-4 py-2"><strong>{item.name}</strong> (x{item.count}) <span className='bg-black rounded-md p-1'>{item?.productId}</span></td>
                    <td className="px-4 py-2">{item.servings || "-"}</td>
                    <td className="px-4 py-2">{item.flavor || "-"}</td>
                    {itemIndex === 0 && (
                      <td rowSpan={order.cartItems.length} className="px-4 py-2 align-top border-l border-gray-700">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                      </td>
                    )}
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-400">No orders found</td>
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
