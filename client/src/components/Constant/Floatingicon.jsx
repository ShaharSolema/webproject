import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const FloatingIcon = () => {
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = footerRef.current;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top <= windowHeight) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const iconStyle = {
    position: 'fixed',
    bottom: isAboveFooter ? '220px' : '20px',
    left: '10px',
    zIndex: 998,
    transition: 'bottom 0.3s, transform 0.3s', // מעבר חלק לגובה ולגודל
    fontSize: '50px',
    color: 'green',
    transform: isHovered ? 'scale(1.2)' : 'scale(1)', // התרחבות בעת ריחוף
  };

  return (
    <>
      <div ref={footerRef}></div> {/* Div שמייצג את הפוטר */}
      <div
        style={iconStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href="https://wa.me/message/KT2QAE5WRHG3B1" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-whatsapp" style={{ color: 'black' }}></i>
        </a>
      </div>
    </>
  );
};

export default FloatingIcon;
