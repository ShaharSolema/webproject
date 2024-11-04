import 'react';
import Highlight from '../Home/Highlight';
import CategoryBoxes from './CategoryBoxes'; // ייבוא רכיב הקטגוריות
import Testimonials from './Testimonials'; // ייבוא רכיב ההמלצות

const Home = () => {
  return (
    <main className="pt-5 mt-5">
      <div className="container">
        <h1>ברוכים הבאים לאתר MichalNail Art</h1>
        <p>כאן תוכלו למצוא את כל המוצרים והשירותים שלנו בתחום אמנות הציפורניים.</p>
        <Highlight />
        
        {/* הוספת כותרת לקטגוריות */}
        <h2 className="categories-title">קטגוריות</h2>
        <CategoryBoxes /> {/* הוספת רכיב הקטגוריות */}

        {/* הוספת רכיב לקוחות ממליצות */}
        <Testimonials /> {/* הוספת רכיב ההמלצות */}
      </div>
    </main>
  );
};

export default Home;
