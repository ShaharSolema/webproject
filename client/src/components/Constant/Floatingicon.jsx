import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; // ייבוא CSS של Font Awesome

const FloatingIcon = () => {
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const footerRef = React.useRef(null); // Reference for the footer

  useEffect(() => {
    const handleScroll = () => {
      const footer = footerRef.current;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the bottom of the icon is above the top of the footer
        if (footerRect.top <= windowHeight - 50) { // 50 is the height of the icon
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Update if window size changes
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const iconStyle = {
    position: 'fixed',
    bottom: isAboveFooter ? '50px' : '10px', // Keep it at 10px until it gets to 50px above footer
    left: '10px',
    zIndex: 998,
    transition: 'bottom 0.3s', // Smooth transition
    fontSize: '50px', // גובה האייקון
    color: 'green' // צבע האייקון
  };

  return (
    <>
      <div ref={footerRef}></div> {/* This div represents the footer */}
      <div style={iconStyle}>
        <a href="https://wa.me/message/KT2QAE5WRHG3B1" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-whatsapp" style={{ color: 'black' }}></i>
        </a>
      </div>
    </>
  );
};

export default FloatingIcon;
