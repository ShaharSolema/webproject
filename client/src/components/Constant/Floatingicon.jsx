import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const FloatingIcon = () => {
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = footerRef.current;
      const windowHeight = window.innerHeight;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();

        // אם הפוטר קרוב לתחתית, האייקון יישאר בגובה מעל הפוטר
        if (footerRect.top <= windowHeight) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }
      }
    };

    // מוסיף מאזינים לאירועים של גלילה והתאמת גודל
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // הפונקציה הזו תסיר את המאזינים כשלא נצטרך אותם
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []); // מכניס את המאזינים כשקומפוננטה טוענת

  // עיצוב האייקון
  const iconStyle = {
    position: 'fixed',
    bottom: isAboveFooter ? '220px' : '20px',  // אם האייקון מעל הפוטר, הוא יישאר 220px מעל הפוטר, אחרת ב-20px
    left: '10px',
    zIndex: 998,
    transition: 'bottom 0.3s, transform 0.3s',
    fontSize: '50px',
    color: 'green',
    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
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
