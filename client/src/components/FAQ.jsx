// src/components/FAQ.jsx
import { useState, useEffect, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [height, setHeight] = useState('0px');
  const answerRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      setHeight(`${answerRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [activeIndex]);

  const faqData = [
    { 
      question: "איפה אנחנו נמצאים?", 
      answer: "שכונת רמז, ראשון לציון." 
    },
    { 
      question: "כמה שנים את בעלת העסק?", 
      answer: "אני בעלת העסק כבר 8 שנים." 
    },
    {
      question: "איך ניתן ליצור קשר?",
      answer: `
        ניתן ליצור איתי קשר במספר: 052-2881460 - בטלפון ובווטסאפ.<br />
        ניתן גם לפנות דרך האינסטגרם על-ידי לחיצה: 
        <a href='https://www.instagram.com/michal_nailart/profilecard/?igsh=ODdrNDJkc3Rtd2pj' target='_blank' class="instagram-link">
          <i class="bi bi-instagram" style="font-size: 1.5rem;"></i>.
        </a>
      `
    },
    {
      question: "מהי מדיניות המשלוחים?",
      answer: `
        • משלוח עד הבית (בעלות של 35₪) בין 1-4 ימי עסקים.<br />
        • משלוח לנקודות חלוקה (בעלות של 20₪) בין 1-6 ימי עסקים.<br />
        • איסוף עצמי (ללא עלות) מראשון לציון.
      `
    },
    {
      question: "מהן אפשרויות תשלום?",
      answer: `
        • אשראי.<br />
        • ביט.<br />
        • פייבוקס.<br />
        • אפל פיי וגוגל פיי.<br />
        • צ'ק.<br />
        • העברה בנקאית.<br />
        • מזומן בהגעה פיזית למקום.
      `
    }
  ];

  return (
    <div style={{ maxWidth: '100%', margin: '80px', padding: '0', textAlign: 'right',direction:'rtl' }}>
      <style>
        {`
          .instagram-link {
            color: black; /* צבע ברירת מחדל */
            text-decoration: none; /* הסרת קו תחתון */
          }
          .instagram-link:hover {
            color: blue; /* צבע כחול כאשר העכבר מעל */
          }
          .answer {
            transition: height 0.3s ease, padding 0.3s ease;
            overflow: hidden;
          }
        `}
      </style>
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
              transition: 'background-color 0.3s',
            }}
            onClick={() => toggleFAQ(index)}
            aria-expanded={activeIndex === index}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
          >
            <span style={{ flex: 1 }}>{item.question}</span>
            <span style={{ fontSize: '1.2rem' }}>
              {activeIndex === index ? '-' : '+'}
            </span>
          </div>
          <div
            className="answer"
            style={{
              height: activeIndex === index ? height : '0px',
              backgroundColor: '#fff',
              padding: activeIndex === index ? '15px' : '0 15px', // padding when open, none when closed
              textAlign: 'right',
            }}
            ref={activeIndex === index ? answerRef : null}
          >
            <p dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;

