import React from 'react'
import { useState, useEffect } from 'react';
import TopHeader from './layouts/TopHeader/topHeader.jsx'
import Header from './layouts/Header/header.jsx'
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './layouts/Footer/Footer.jsx';
import Loading from './layouts/Loading/Loading.jsx';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
        <ToastContainer />
        {/* <TopHeader />*/}
        <Header />
        {/* <Event /> */}

        <Outlet />
        <Footer />
        </div>
      )}
    </div>


  )
}

export default App
