import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import RedirectIfAuthenticated from './RedirectIfAuthenticated/RedirectIfAuthenticated'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Layout from './Layout/Layout'
import About from './Pages/About/About'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App