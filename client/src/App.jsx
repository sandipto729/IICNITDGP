import React, { useState, useEffect } from 'react';
import TopHeader from './layouts/TopHeader/topHeader.jsx'
import Header from './layouts/Header/header.jsx'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './layouts/Footer/Footer.jsx';
import Loading from './layouts/Loading/Loading.jsx';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasRotated = sessionStorage.getItem('rotationDone');

    if (!hasRotated) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('rotationDone', 'true'); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ToastContainer />
          {/* <TopHeader /> */}
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
