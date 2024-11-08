import React, { useEffect, useState } from "react";
import "../styles/AdvancedCourses.css";
import Michal2 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.32.jpeg';
import Michal3 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.23.jpeg';
import Michal4 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26 (1).jpeg';
import Michal5 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33.jpeg';
import Michal6 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.36.jpeg';
import Michal7 from './data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.29.jpeg';

const images = [Michal2, Michal3, Michal4, Michal5, Michal6, Michal7];

const AdvancedCourses = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in-a");

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out-a");

      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFadeClass("fade-in-a");
      }, 500); 
    }, 3500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="advanced-courses-wrapper">
      <div className="advanced-courses-empty"></div>
      <div className="advanced-courses-text">
        <h2>ברוכים הבאים לקורסים המתקדמים של Michal Nail Art!</h2>
        <p>
          את כבר מכירה את הבסיס של עיצוב הציפורניים, אבל רוצה להתקדם עוד ולהביא את הכישרון שלך לשלב הבא? הקורס המתקדם שלנו הוא המקום שבו כישורים טובים הופכים למומחיות!
        </p>
        <p>
          בקורס המתקדם, תלמדי טכניקות מתקדמות וחדשניות, שישדרגו את הידע שלך ויפתחו לך דלתות לאפשרויות עיצוב מרהיבות. תלמדי לשלב אומנות ועבודה מדויקת, כך שתוכלי להציע ללקוחות שלך עיצובים אישיים ברמה הגבוהה ביותר.
        </p>
        <p>
          אנחנו נעמיד לרשותך את הכלים העדכניים ביותר, ונאפשר לך להתנסות בטכניקות שיהפכו אותך לאומנית ציפורניים יצירתית ובטוחה בעצמה.
        </p>
        <p>
          <strong>בין הנושאים המובילים שתלמדי בקורס:</strong>
        </p>
        <ul>
          <li>טכניקות בניית ציפורניים מתקדמות בשיטות ג'ל ואקריל</li>
          <li>שימוש בפיגמנטים, אבקות ונצנצים להעצמת כל עיצוב</li>
          <li>עיצובים עדכניים ומורכבים המותאמים לטרנדים הכי חמים</li>
          <li>הקפדה על בריאות ותחזוקה של ציפורניים לאורך זמן</li>
          <li>שיטות ייחודיות להתאמת עיצוב אישי לכל לקוחה</li>
        </ul>
        <p>
          המרצים המקצועיים שלנו ילוו אותך לאורך כל הדרך, ויספקו לך ידע מתקדם וטיפים ייחודיים שיעזרו לך להצליח בתחום. זהו המקום שבו האומנות שלך הופכת לקריירה מבוססת, מרתקת ומשגשגת.
        </p>
        <h5>
          הצטרפי לקורס המתקדמים וגלי כיצד להפוך כל ציפורן ליצירת אומנות מרהיבה ומקצועית!
        </h5>
        <p>
          זוהי ההזדמנות שלך להצטרף לנבחרת מובילות התחום ולהגשים חלום לקריירה עם תשוקה ואהבה לעולם עיצוב הציפורניים. 
        </p>
        <p>
          אנחנו מחכים לך עם כל הידע, התמיכה וההכוונה שתזדקקי להם – הצטרפי עכשיו והתקדמי לרמה הבאה!
        </p>
        <div className="advanced-courses-signup">
          <h3> הירשמי עכשיו בלחיצת כפתור!</h3>
          <p>אל תפספסי את ההזדמנות להצטרף לשורה הראשונה של אומניות הציפורניים</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfMKrFbtrwKOGs-lYHxSrBqcL32ZyUTX-laKbg7WwniPNhkJw/viewform" target="_blank" rel="noopener noreferrer">
          <button className="a-signup-button">מחכה לך</button>
          </a>
        </div>
      </div>
      <div className="advanced-courses-image">
        <img src={images[currentImage]} className={fadeClass} alt="Michal Frideman - Advanced Courses" />
      </div>
    </div>
  );
};

export default AdvancedCourses;
