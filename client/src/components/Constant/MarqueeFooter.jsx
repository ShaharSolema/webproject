import { useEffect, useState } from 'react';
import '../../styles/MarqueeFooter.css';

const MarqueeFooter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = [
    'כל הזכויות שמורות',
    'מבצעים מיוחדים על כל הקורסים',
    'הנחות על המוצרים בחנות שלנו'
  ];

  useEffect(() => {
    let charIndex = isDeleting ? displayedText.length - 1 : displayedText.length + 1;
    const timeout = setTimeout(() => {
      // עדכון הטקסט המוצג עם מחיקה/הוספה
      setDisplayedText(messages[currentMessageIndex].slice(0, charIndex));

      // סיום מחיקה
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }
      // סיום כתיבה והתחלת מחיקה
      else if (!isDeleting && charIndex === messages[currentMessageIndex].length) {
        setIsDeleting(true);
      }
    }, isDeleting ? 100 : 150); // מהירות מחיקה וכתיבה

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentMessageIndex, messages]);

  return (
    <footer className="marquee-footer">
      <div className="text-container">
        <span className="typing-animation">{displayedText}</span>
      </div>
    </footer>
  );
};

export default MarqueeFooter;
