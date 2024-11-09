import React, { useEffect, useState } from 'react';
import '../styles/Workshops.css';
import Michal2 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.22 (2).jpeg';
import Michal3 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.23.jpeg';
import Michal4 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.24 (1).jpeg';
import Michal5 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26 (1).jpeg';
import Michal6 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33 (1).jpeg';
import Michal7 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33.jpeg';

const Workshops = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  const images = [Michal2, Michal3, Michal4, Michal5, Michal6, Michal7];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentImageIndex((prevImage) => (prevImage + 1) % images.length);
        setFadeClass("fade-in");
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className='title'>!ברוכים הבאים לעולם הסדנאות! זה המקום להתרשם ולהתקדם בקריירה שלך</h1>

      <section className="workshop-hero">
        <div className="image-slider">
          <img
            src={images[currentImageIndex]}
            alt={` ${currentImageIndex + 1}`}
            className={fadeClass}
          />
        </div>
        <div className="workshop-description">
          <h2>?מה את הולכת לקבל מהסדנה</h2>
          <ul>
            <li>שליטה בטכניקות מתקדמות</li>
            <li>עבודה עם כלים וחומרים איכותיים</li>
            <li>דיוק וצביעה ברמה הגבוהה ביותר</li>
            <li>הבנה מעמיקה של פרופורציות וסימטריה</li>
            <li>הצלחות ואהבות מקצועיות</li>
            <li>הקפצת רמת היצירתיות והדיוק שלך</li>
          </ul>
        </div>
      </section>

      <section className="why-choose">
        <h2>?למה כדאי לך ללמוד דווקא אצלי</h2>
        <div className="benefits">
          <div className="benefit">
            <h3>ניסיון מקצועי של 12 שנה</h3>
            <p>תלמדי מהתמחות המובילה בארץ לציור דמויות על ציפורניים.</p>
            <hr />
          </div>
          <div className="benefit">
            <h3>ידע ייחודי שלא תמצאי בשום מקום אחר</h3>
            <p>טכניקות מתקדמות וחדשניות לציור דמויות</p>
            <hr />
          </div>
          <div className="benefit">
            <h3>יחס אישי בכיתות קטנות</h3>
            <p>עד 3 תלמידות בלבד, ליווי צמוד ויחס אישי לכל משתתפת</p>
            <hr />
          </div>
          <div className="benefit">
            <h3>פיתוח סגנון אישי</h3>
            <p>תלמדי ליצור חתימה ייחודית שתבדל אותך מהמתחרות</p>
            <hr />
          </div>
          <div className="benefit">
            <h3>סט מכחולים מקצועי מתנה</h3>
            <p>סט בייצור אישי שיהפוך את עבודתך למדייקת ומקצועית יותר.</p>
            <hr />
          </div>
        </div>

        {/* כפתור לחיץ */}
        <div className="signup-button-container">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfMKrFbtrwKOGs-lYHxSrBqcL32ZyUTX-laKbg7WwniPNhkJw/viewform"
            className="signup-button" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-balloon-heart" style={{ marginLeft: "5px", color: "black", fontSize: "1.2em", verticalAlign: "middle" }}></i>
            נשמע לך מעניין? תילחצי עליי וניפגש
          </a>
        </div>
      </section>
    </div>
  );
};

export default Workshops;






