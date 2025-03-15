import React from 'react'
import TopHeader from './layouts/TopHeader/topHeader.jsx'
import Header from './layouts/Header/header.jsx'
import { Outlet } from 'react-router'



const App = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      {/* <Event /> */}
    </div>
  )
}

export default App
