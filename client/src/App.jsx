import React from 'react'
import TopHeader from './layouts/TopHeader/topHeader.jsx'
import Header from './layouts/Header/header.jsx'
import { Outlet } from 'react-router-dom';

import Footer from './layouts/Footer/Footer.jsx'



const App = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      {/* <Event /> */}

      <Outlet />
      <Footer />
    </div>


  )
}

export default App
