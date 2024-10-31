// src/pages/Home.jsx
// import Recommendations from '../components/Home/Recommendations';

import Highlight from '../Home/Highlight'; //tal

const Home = () => {
  return (
    <main className="pt-5 mt-5">
      {/* תוכן מרכזי של דף הבית */}
      <div className="container">
        <h1>ברוכים הבאים לאתר MichalNail Art</h1>
        <p>כאן תוכלו למצוא את כל המוצרים והשירותים שלנו בתחום אמנות הציפורניים.</p>
        {/* <Recommendations /> */}
        {/* כאן אפשר להוסיף אלמנטים נוספים כגון תמונות, קישורים, גלריות וכו' */}
        <Highlight/>
      </div>
    </main>
  );
};

export default Home;
