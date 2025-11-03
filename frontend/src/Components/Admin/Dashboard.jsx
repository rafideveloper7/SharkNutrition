import React, { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchDashboardStats();
      console.log(' Dashboard stats loaded:', data);
      
      setStats(data);
    } catch (err) {
      console.error(' Failed to load stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">Dashboard Overview</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">Dashboard Overview</h1>
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={loadStats}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Total Users Card */}
        <div className="bg-blue-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-users text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm lg:text-base font-medium">Total Users</p>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-green-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-shopping-cart text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-sm lg:text-base font-medium">Total Orders</p>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-purple-400 rounded-lg p-4 lg:p-6 text-black shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-600 p-2 lg:p-3 rounded-lg mr-3 lg:mr-4">
              <i className="fas fa-box text-white text-xl lg:text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">{stats.totalProducts.toLocaleString()}</p>
              <p className="text-sm lg:text-base font-medium">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={loadStats}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i className="fas fa-sync-alt"></i>
          Refresh Stats
        </button>
      </div>
    </div>
  );
}