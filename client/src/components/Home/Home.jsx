import React, { useState, useEffect } from 'react';
import Highlight from '../Home/Highlight';
import CategoryBoxes from './CategoryBoxes';
import Testimonials from './Testimonials';
import Whyus from './Whyus'; 
import bannerImage from '../data/pictures/shoppingIL.png';  // ייבוא התמונה

const Home = () => {
  // הגדרת זמן לספירה לאחור
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endDate = new Date('2024-11-16T23:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft('הזמן עבר');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // מחשבים את הימים
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${days} ימים, ${hours} שעות, ${minutes} דקות, ${seconds} שניות`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-5 mt-5">
      <Highlight />
      <div className="container">
        <div className="banner-container">
          <img src={bannerImage} alt="Banner" className="banner-img" />  
          <div className="countdown">
            <span>המבצע ייגמר בעוד: {timeLeft}</span>
          </div>
        </div>

        
        <h2 className="categories-title">קטגוריות</h2>
        <CategoryBoxes />
        <Testimonials />
        <Whyus />
      </div>
    </main>
  );
};

export default Home;
