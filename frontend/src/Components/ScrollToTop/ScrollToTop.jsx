import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you are using React Router v6+

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Reruns when the pathname changes

  return null; // This component doesn't render anything visually
}

export default ScrollToTop;