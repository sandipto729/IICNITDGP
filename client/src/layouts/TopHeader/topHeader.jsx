import React, { useState, useEffect } from 'react';
import DesktopHeader from './desktoptopHeader';
import MobileHeader from './mobiletopHeader';

const topHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </div>
  );
};

export default topHeader;
