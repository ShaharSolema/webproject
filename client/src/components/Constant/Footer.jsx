import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Footer = () => {
  // CSS styles defined as a JavaScript object
    const styles = {
        footer: {
          backgroundColor: 'rgb(250, 210, 204)',
          color: 'white',
          padding: '20px 0',
          textAlign: 'center',
          position: 'fixed',
          bottom: '0',
          width: '100%',
          zIndex: '10',
        },
        footerContainer: {
          maxWidth: '1200px',
          margin: 'auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        },
        footerSection: {
          flex: '1 1 200px',
          margin: '10px',
          textAlign: 'end',
        },
        footerSectionH3: {
          marginBottom: '10px',
        },
        footerSectionUl: {
          listStyle: 'none',
          padding: 0,
        },
        footerSectionLi: {
          marginBottom: '5px',
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
          width: '600px',
          height: 'auto',
          maxWidth: '100%',
          display: 'block',
          marginLeft: '-80px',
        },
        rigR: {
          backgroundColor: 'rgb(250, 210, 204)', // התאמת צבע לרקע של ה-footer
          textAlign: 'center',
          padding: '10px',
          margin: '0', // הסרת מרווחים חיצוניים
        },
      };
      

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
                <h3 style={styles.footerSectionH3}>ניווט מהיר:</h3>
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
        <p>© 2024 כל הזכויות שמורות</p>
      </div>
    </footer>
  );
};


export default Footer;
