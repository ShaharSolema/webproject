import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import { useEffect, useState } from 'react';

const Footer = () => {
  // CSS styles defined as a JavaScript object
  const styles = {
    footer: {
      backgroundColor: 'rgb(250, 210, 204)',
      color: 'white',
      padding: '5px 0', // הקטנת ה-padding
      textAlign: 'center',
      position: 'relative', // שינוי ל-relative
      width: '100%',
      zIndex: '10', // מרווח עליון לפוטר
      margin: '0',
    },
    footerContainer: {
      maxWidth: '1900px',
      margin: 'auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    footerSection: {
      flex: '1 1 200px',
      margin: '0', // הסרת ה-margin
      marginLeft:'100px',
      textAlign: 'center',
    },
    footerSectionH3: {
      marginBottom: '5px',
    },
    footerSectionUl: {
      listStyle: 'none',
      padding: 0,
    },
    footerSectionLi: {
      marginBottom: '0px',
    },
    footerSectionLink: {
      color: 'white',
      textDecoration: 'none',
    },
    iconsStyle: {
      display: 'flex',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    },
    iconsStyleLi: {
      margin: '0 5px',
    },
    iconsStyleLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '30px',
    },
    footerLogo: {
      width: '1000px',
      height: 'auto',
      maxWidth: '100%',
      display: 'block',
      marginLeft: '-100px',
      marginTop:'60px',
    },
    rightsText: {
      margin: '-20px', // רווחים מעל ומתחת
      textAlign: 'center',
      position:'center',
    },
    scrollToTop: {
      cursor: 'pointer',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'rgb(250, 210, 204)',
      borderRadius: '50%',
      padding: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      display: 'none', // מתחיל כמוסתר
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.3s ease', // מעבר חלק
    },
    scrollToTopVisible: {
      display: 'flex', // הופך ל-flex כאשר נגללים
    },
  };

  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setVisible(currentScroll > 50); // מציג את החץ אחרי 300 פיקסלים
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer style={styles.footer}>
      <div className="container text-center">
        <div style={styles.footerContainer}>
          <div className="row">
            <div className="col">
              <div style={styles.footerSection}>
                <img
                  style={styles.footerLogo}
                  src="src/styles/Michal-logo2.jpeg"
                  alt="MichalLogoFooter"
                />
              </div>
            </div>
            <div className="col">
              <div style={styles.footerSection}>
                <h3 style={styles.footerSectionH3}>מחכה לכן ברשתות השונות</h3>
                <ul style={{ ...styles.footerSectionUl, ...styles.iconsStyle }}>
                  <li style={styles.iconsStyleLi}>
                    <a href="https://www.tiktok.com/@michal_nailart?_t=8VGyg3HR2RN&_r=1" target="_blank" style={styles.iconsStyleLink}>
                      <i className="bi bi-tiktok"></i>
                    </a>
                  </li>
                  <li style={styles.iconsStyleLi}>
                    <a href="https://www.facebook.com/michalfridmannails?mibextid=LQQJ4d" target="_blank" style={styles.iconsStyleLink}>
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li style={styles.iconsStyleLi}>
                    <a href="https://www.instagram.com/michal_nailart/?hl=en" target="_blank" style={styles.iconsStyleLink}>
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div style={styles.footerSection}>
                <h3 style={styles.footerSectionH3}>ניווט מהיר</h3>
                <ul style={styles.footerSectionUl}>
                  <li style={styles.footerSectionLi}>
                    <a href="/" style={styles.footerSectionLink}>
                      <i className="bi bi-house"></i> דף הבית
                    </a>
                  </li>
                  <li style={styles.footerSectionLi}>
                    <a href="/productstore" style={styles.footerSectionLink}>
                      <i className="bi bi-shop"></i> חנות
                    </a>
                  </li>
                  <li style={styles.footerSectionLi}>
                    <a href="/about" style={styles.footerSectionLink}>
                      <i className="bi bi-person-heart"></i> קצת עליי
                    </a>
                  </li>
                  <li style={styles.footerSectionLi}>
                    <a href="https://wa.me/message/KT2QAE5WRHG3B1" target="_blank" style={styles.footerSectionLink}>
                      <i className="bi bi-whatsapp"></i> יצירת קשר
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.rigR}>
        <p style={styles.rightsText}>© 2024 כל הזכויות שמורות</p> {/* טקסט של זכויות שמורות */}
      </div>
      <div style={{ ...styles.scrollToTop, ...(visible ? styles.scrollToTopVisible : {}) }} onClick={scrollToTop}>
        <i className="bi bi-chevron-up" style={{ fontSize: '20px', color: 'white' }}></i>
      </div>
    </footer>
  );
};

export default Footer;
