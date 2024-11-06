import React, { useEffect } from "react";
import "../styles/About.css"; 
import Michalpic from '../components/data/pictures/MichalAbout.jpg';

const About = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#e0f7f7";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="about-wrapper">
      <div className="about-text">
        <h2>נעים להכיר! אני מיכל פרידמן</h2>
        <p>
          בת 24, מייסדת המותג Michal Nail Art ומומחית בתחום אומנות הציפורניים מעל ל12 שנים. החלטתי להפוך את האהבה שלי לאומנות ולפרטים קטנים למקצוע מרגש ומשמעותי.
        </p>
        <p>
          בסטודיו שלי אני מעבירה קורסים מקצועיים בתחום הלק ג'ל, בהם קורסי מתחילות, השתלמויות מתקדמות, וסדנאות ייחודיות על קישוטים ודמויות. המטרה שלי היא לתת לכל תלמידה את הכלים ואת הביטחון לפרוץ בתחום ולהפוך את התשוקה שלה לקריירה מצליחה.
        </p>
        <p>
          צוות הסטודיו שלי ואני מקבלות לקוחות שמגיעות למגוון רחב של טיפולים בשיטה שפיתחתי, ואנחנו כאן כדי להעניק לכל לקוחה חוויה אישית ומקצועית שמשאירה חותם.
        </p>
        <p>
          מעבר לכך, אני מפתחת ליין מוצרים ייחודי שיצרתי מתוך הבנה עמוקה של הצרכים שלכן – גם של הלקוחות וגם של העוסקות בתחום. כל מוצר הוא תוצאה של מחשבה רבה ושל אהבה גדולה לעולם אומנות הציפורניים.
        </p>
        <p>
          אני כאן כדי להפוך כל ציפורן לקנבס אמנותי ולעזור לכן להביא לידי ביטוי את הסטייל האישי שלכן, בדרך שתהיה מדויקת עבורכן.
        </p>
        <p>
          אני מזמינה אותך להצטרף לעולם שלי ולהתאהב באמנות בדרך קצת שונה.
        </p>

        {/* שורת האייקונים */}
        <div className="social-icons d-flex justify-content-center mt-3">
          <a href="https://www.facebook.com/michalfridmannails?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="icon-link">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/michal_nailart/?hl=en" target="_blank" rel="noopener noreferrer" className="icon-link">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@michal_nailart?_t=8VGyg3HR2RN&_r=1" target="_blank" rel="noopener noreferrer" className="icon-link">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="https://api.whatsapp.com/message/KT2QAE5WRHG3B1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="icon-link"> 
          <i className="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
      <div className="about-image">
        <img src={Michalpic} alt="Michal Frideman" />
      </div>
    </div>
  );
};

export default About;
