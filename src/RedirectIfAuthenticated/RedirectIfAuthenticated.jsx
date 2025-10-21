import React from 'react'
import { Outlet } from 'react-router-dom'

function RedirectIfAuthenticated() {
  return <Outlet/>
}

export default RedirectIfAuthenticated