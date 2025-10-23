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
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Register from './Pages/Register/Register'
import Cart from './Pages/Cart/Cart'
import Wishlist from './Pages/Wishlist/Wishlist'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/wishlist' element={<Wishlist/>} />
          </Route>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App