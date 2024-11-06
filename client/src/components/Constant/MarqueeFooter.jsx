import { useEffect, useState } from 'react';
import '../../styles/MarqueeFooter.css';

const MarqueeFooter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [waitTime, setWaitTime] = useState(false); // state to track wait time
  const messages = [
    'מבצע על המשלוחים,20% הנחה בהזמנה מעל 100 ש"ח',
    'מבצעים מיוחדים על כל הקורסים',
    'צרו קשר עוד היום למבצעים שווים'
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
        setWaitTime(false); // Reset wait time when starting new message
      }
      // סיום כתיבה והתחלת מחיקה
      else if (!isDeleting && charIndex === messages[currentMessageIndex].length) {
        setWaitTime(true); // Set wait time to true after displaying full text
        setTimeout(() => {
          setIsDeleting(true); // Start deleting after 3 seconds
        }, 3000); // Wait 3 seconds before starting to delete
      }
    }, isDeleting ? 100 : waitTime ? 3000 : 150); // מהירות מחיקה וכתיבה

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentMessageIndex, messages, waitTime]);

  return (
    <footer className="marquee-footer">
      <div className="text-container">
        <span className="typing-animation">{displayedText}</span>
      </div>
    </footer>
  );
};

export default MarqueeFooter;
