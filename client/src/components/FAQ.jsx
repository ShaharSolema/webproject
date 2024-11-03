// src/components/FAQ.jsx
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    { question: "שאלה 1", answer: "תשובה 1" },
    { question: "שאלה 2", answer: "תשובה 2" },
    { question: "שאלה 3", answer: "תשובה 3" },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'right' }}>
      {faqData.map((item, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '10px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              backgroundColor: '#f7f7f7',
              padding: '15px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
              textAlign: 'right',  // הוספת יישור לימין כאן
              direction: 'rtl',    // הוספת כיוון ימין לשמאל
            }}
            onClick={() => toggleFAQ(index)}
          >
            <span style={{ flex: 1 }}>{item.question}</span> {/* Flex to occupy space */}
            <span style={{ fontSize: '1.2rem' }}>
              {activeIndex === index ? '-' : '+'}
            </span>
          </div>
          <div
            style={{
              maxHeight: activeIndex === index ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, padding 0.3s ease',
              backgroundColor: '#fff',
              padding: activeIndex === index ? '15px' : '0 15px',
              textAlign: 'right',  // יישור התשובות לימין
            }}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
