import React, { useEffect, useState } from "react";
import "../styles/BeginnerCourses.css";
import Michal1 from '../components/data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26.jpeg';
import Michal2 from '../components/data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.32.jpeg';
import Michal3 from '../components/data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.23.jpeg';
import Michal4 from '../components/data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.36 (1).jpeg';
import Michal5 from '../components/data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.27 (2).jpeg';

const images = [Michal1, Michal2, Michal3, Michal4, Michal5];

const BeginnerCourses = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFadeClass("fade-in");
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="beginner-courses-wrapper">
      <div className="beginner-courses-text">
        <h2>   ברוכות הבאות לקורס המתחילות של Michal Nail Art! </h2>
        <p>רוצה להיכנס לעולם המרתק של עיצוב ובניית ציפורניים ולהפוך את התשוקה שלך לאומנות מקצועית ומצליחה? הגעת למקום הנכון!</p>
        <p>בקורס המתחילות שלנו, אני מציעה לך את כל הכלים והידע הדרושים כדי לקחת את התחביב שלך לרמה הבאה ולהפוך אותו למקצוע משתלם ומרשים. אני מבינה עד כמה זה חשוב לך להרגיש בטוחה ובעלת שליטה בכל שלב, ולכן הקורס בנוי כך שיתמוך בך וילווה אותך לכל אורך הדרך - צעד אחר צעד.</p>
        <p>בקורס תלמדי את כל מה שצריך לדעת, כולל:</p>
        <ul>
          <li>היכרות עם החומרים והכלים השונים בעולם הציפורניים</li>
          <li>בניית ציפורניים בג'ל ובאקריל – שלב אחרי שלב</li>
          <li>טכניקות עיצוב מרהיבות, עיצובים עדינים ועזים כאחד</li>
          <li>שמירה על בריאות הציפורניים והעור במהלך העבודה</li>
        </ul>
        <p>המרצים המנוסים שלי והצוות שלי ילוו אותך בכל שלב ויעניקו לך את הביטחון ואת הכלים להיות לא רק מעצבת, אלא גם אמנית בתחום עיצוב הציפורניים. המטרה שלנו היא לתת לך את הכלים להפוך את התשוקה שלך לקריירה מצליחה ומרשימה.</p>
        <h5>הצטרפי אלינו ותגלי איך כל ציפורן יכולה להפוך ליצירת אמנות מרהיבה!</h5>
        <p>אני כאן כדי לעזור לך לקחת את הצעד הראשון לעתיד מצליח ומרגש בתחום הציפורניים. הצטרפי אלינו עכשיו והתחילי את הדרך שלך לעתיד מקצועי ומספק!</p>

        
        <div className="beginner-courses-signup">
          <h3>רוצה להבטיח את מקומך בקורס למתחילות?</h3>
          <p>זה הזמן שלך להקפיץ את עצמך והעסק שלך למעלה!</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfMKrFbtrwKOGs-lYHxSrBqcL32ZyUTX-laKbg7WwniPNhkJw/viewform" target="_blank" rel="noopener noreferrer">
            <button className="beg-signup-button">לחצי כאן למלא שאלון התאמה</button>
          </a>
        </div>
      </div>
      <div className="beginner-courses-image">
        <img src={images[currentImage]} className={fadeClass} alt="Michal Frideman" />
      </div>
    </div>
  );
};

export default BeginnerCourses;




