import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
const backendApi = import.meta.env.VITE_API_BASE

export default function ProtectedAdminRoute() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`${backendApi}/api/admin/verify`, {
          method: "GET",
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setChecking(false);
      }
    }
    verify();
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Verifying admin access...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
