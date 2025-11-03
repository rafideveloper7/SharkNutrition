import React from 'react';
import { Route, Routes } from 'react-router-dom'
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
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/bankDetails' element={<BankDetails />} />
            <Route path='/return-policy' element={<ReturnPolicy />} />
            <Route path='/terms-and-conditions' element={<TermsConditions />} />
            <Route path='/settings' element={<Settings />} />

            {/* Admin nested routes - rafi edit*/}
            <Route path='/admin' element={<AdminPanel />}>
              <Route index element={<Dashboard />} />         
              <Route path='all-products' element={<AllProducts />} />    
              <Route path='add-product' element={<AddProducts />} />  
              <Route path='users' element={<Users />} />          
            </Route>
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