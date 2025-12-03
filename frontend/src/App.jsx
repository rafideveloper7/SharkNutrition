import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import RedirectIfAuthenticated from './RedirectIfAuthenticated/RedirectIfAuthenticated'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Layout from './Layout/Layout'
import About from './Pages/About/About'
import Products from './Pages/Products/Products'
import Contact from './Pages/Contact/Contact'
import Register from './Pages/Register/Register'
import Wishlist from './Pages/Wishlist/Whishlist'
import Cart from './Pages/Cart/Cart'
import { ContextProvider } from './Context/CartContext'
import Checkout from './Pages/Checkout/Checkout'
import BankDetails from './Pages/BankDetails/BankDetails'
import ReturnPolicy from './Pages/ReturnPolicy/ReturnPolicy'
import TermsConditions from './Pages/TermsConditions/TermsConditions'
import Settings from './Pages/Settings/Settings'
import { Toaster } from "react-hot-toast";
import AdminPanel from './Components/Admin/AdminPanel'
import Dashboard from './Components/Admin/Dashboard'
import AllProducts from './Components/Admin/AllProducts'
import AddProducts from './Components/Admin/AddProducts'
import Users from './Components/Admin/Users'
import AdminLogin from './Components/Admin/AdminLogin'
import NotFound from './NotFound/NotFound';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import CouponCode from './Components/Admin/CouponCode';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
const backendApi = import.meta.env.VITE_API_BASE

// ✅ Admin Protected Route Component
function AdminProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const res = await fetch(`${backendApi}/api/admin/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
      } finally {
        setChecking(false);
      }
    }

    verifyAdmin();
  }, []);


  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Verifying admin access...</div>
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

// ✅ Admin Login Route Component (redirects if already logged in)
function AdminLoginRoute() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const res = await fetch(`${backendApi}/api/admin/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
      } finally {
        setChecking(false);
      }
    }

    verifyAdmin();
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Checking authentication...</div>
      </div>
    );
  }

  return isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin />;
}

function App() {
  return (
    <ContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: '16px', padding: '12px' },
          success: { duration: 3000, theme: { primary: '#4ade80' } },
          error: { duration: 4000, theme: { primary: '#f87171' } },
        }}
      />
      <Routes>
        {/* ✅ Admin routes - OUTSIDE Layout (separate from main site) */}
        <Route path='/admin/login' element={<AdminLoginRoute />} />

        <Route
          path='/admin/*'
          element={
            <AdminProtectedRoute>
              <AdminPanel />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='all-products' element={<AllProducts />} />
          <Route path='add-product' element={<AddProducts />} />
          <Route path='users' element={<Users />} />
          <Route path='coupons' element={<CouponCode />} />
        </Route>

        {/* ✅ Main site routes - WITH Layout */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/bankDetails' element={<BankDetails />} />
            <Route path='/return-policy' element={<ReturnPolicy />} />
            <Route path='/terms-and-conditions' element={<TermsConditions />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RedirectIfAuthenticated />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </ContextProvider>
  )
}

export default App

// comment for testing rafi - checking why new changing is not shows with israr