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
    <div style={{ maxWidth: '100%', margin: '80px',padding:'-10px', textAlign: 'right' }}>
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
              textAlign: 'right',
              direction: 'rtl',
              transition: 'background-color 0.3s', // הוספת מעבר חלק
            }}
            onClick={() => toggleFAQ(index)}
            aria-expanded={activeIndex === index} // תיאורי נגישות
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} // אפקט hover
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'} // חזרה לצבע המקורי
          >
            <span style={{ flex: 1 }}>{item.question}</span>
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
              textAlign: 'right',
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
