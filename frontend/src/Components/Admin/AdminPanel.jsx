import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
}
