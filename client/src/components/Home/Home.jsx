//Home.jsx

import React from 'react';
import Highlight from '../Home/Highlight';
import CategoryBoxes from './CategoryBoxes';
import Testimonials from './Testimonials';
import Whyus from './Whyus'; 

const Home = () => {
  return (
    <main className="pt-5 mt-5">
      <div className="container">
        <h1>ברוכים הבאים לאתר</h1>
        <h1>MichalNail Art</h1>

        <Highlight />

        
        <h2 className="categories-title">קטגוריות</h2>
        
        <CategoryBoxes />

        <Testimonials />

        <Whyus /> 

      </div>
    </main>
  );
};

export default Home;
