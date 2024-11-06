//Whyus.jsx
import React from 'react';
import '../../styles/Whyus.css';

const Whyus = () => {
  return (
    <section className="why-us-section text-center my-5">
      <div className="why-us-title-wrapper">
        <h2 className="why-us-title">למה לבחור בנו</h2>
      </div>
      <div className="why-us-cards">
        <div className="why-us-card">
          <span className="emoji">💅</span>
          <p>שירות מקצועי</p>
        </div>
        <div className="why-us-card">
          <span className="emoji">🌟</span>
          <p>תוצאות איכותיות</p>
        </div>
        <div className="why-us-card">
          <span className="emoji">❤️</span>
          <p>לקוחות מרוצים</p>
        </div>
        <div className="why-us-card">
          <span className="emoji">💼</span>
          <p>ניסיון רב</p>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
