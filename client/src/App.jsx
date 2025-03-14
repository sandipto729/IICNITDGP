import React from 'react'
import TopHeader from './layouts/TopHeader/topHeader.jsx'
import Header from './layouts/Header/header.jsx'
import { Outlet } from 'react-router'

import Event from './pages/Events/Events.jsx'

const App = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      {/* <Event /> */}
      <Outlet />
    </div>
  )
}

export default App
