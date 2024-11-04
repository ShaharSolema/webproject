import  { useState, useRef, useEffect } from 'react';
import '../../styles/Highlight.css';

// ייבוא התמונות והסרטונים
import Courses1 from '../data/pictures/pictures//Courses/VID-20241025-WA0020.mp4';
import Courses2 from '../data/pictures/pictures//Courses/VID-20241025-WA0021.mp4';
import Courses3 from '../data/pictures/pictures/Courses/VID-20241025-WA0022.mp4';
import Courses4 from '../data/pictures/pictures/Courses/VID-20241025-WA0023.mp4';
import Courses6 from '../data/pictures/pictures/Courses/VID-20241025-WA0024.mp4';
import Courses5 from '../data/pictures/pictures/Courses/VID-20241025-WA0025.mp4';
import Courses7 from '../data/pictures/pictures/Courses/VID-20241025-WA0026.mp4';
import Guides1 from '../data/pictures/pictures/Guides/VID-20240905-WA0011.mp4';
import Guides2 from '../data/pictures/pictures/Guides/VID-20240905-WA0012.mp4';
import Guides3 from '../data/pictures/pictures/Guides/VID-20240905-WA0013.mp4';
import Guides4 from '../data/pictures/pictures/Guides/VID-20240905-WA0014.mp4';
import Guides5 from '../data/pictures/pictures/Guides/WhatsApp Video 2024-11-03 at 20.58.16.mp4';
import Thespringbrushes1 from '../data/pictures/pictures/Thespringbrushes/VID-20240905-WA0010.mp4';
import Thespringbrushes2 from '../data/pictures/pictures/Thespringbrushes/VID-20240905-WA0009.mp4';
import Thespringbrushes3 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0019.jpg';
import Thespringbrushes4 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0020.jpg';
import Thespringbrushes5 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0021.jpg';
import Thespringbrushes6 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0022.jpg';
import Thespringbrushes7 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0023.jpg';
import Thespringbrushes8 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0024.jpg';
import Thespringbrushes9 from '../data/pictures/pictures/Thespringbrushes/IMG-20240905-WA0025.jpg';
import Examples1 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.22 (1).jpeg';
import Examples30 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.22 (2).jpeg';
import Examples2 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.23 (1).jpeg';
import Examples3 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.23.jpeg';
import Examples4 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.24 (1).jpeg';
import Examples5 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.24 (2).jpeg';
import Examples6 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.24.jpeg';
import Examples7 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.25.jpeg';
import Examples8 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26 (1).jpeg';
import Examples9 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26.jpeg';
import Examples10 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.27 (1).jpeg';
import Examples11 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.27 (2).jpeg';
import Examples12 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.27.jpeg';
import Examples13 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.28.jpeg';
import Examples14 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.29 (1).jpeg';
import Examples15 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.29 (2).jpeg';
import Examples16 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.29.jpeg';
import Examples17 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.30.jpeg';
import Examples18 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.31.jpeg';
import Examples19 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.32.jpeg';
import Examples20 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33 (1).jpeg';
import Examples21 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33 (2).jpeg';
import Examples22 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33.jpeg';
import Examples23 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.33.jpeg';
import Examples24 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.34.jpeg';
import Examples25 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.35.jpeg';
import Examples26 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.35.jpeg';
import Examples27 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.36.jpeg';
import Examples28 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.36 (1).jpeg';






const Highlight = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const galleryRef = useRef(null); // Ref for the gallery container
  const videoRef = useRef(null); // Ref for the video element

  // מערך עם התמונות והסרטונים
  const media = [
    [Courses1, Courses2, Courses3, Courses4, Courses5, Courses6,Courses7], // קורסים
    [Guides1, Guides2, Guides3, Guides4,Guides5], // הדרכות
    [Thespringbrushes1, Thespringbrushes2,Thespringbrushes3,Thespringbrushes4,Thespringbrushes5,Thespringbrushes6,Thespringbrushes7,Thespringbrushes8,Thespringbrushes9], // מכחולים
    [Examples1,Examples2,Examples3,Examples4,Examples5,Examples6,Examples7,Examples8,Examples9,Examples10,Examples11,Examples12,Examples13,Examples14,Examples15,Examples16,Examples17,Examples18,Examples19,Examples20,Examples21,Examples22,Examples23,Examples24,Examples25,Examples26,Examples27,Examples28,Examples30],
  ];

  const titles = ['קורסים', 'הדרכות', 'מכחולים','דוגמאות להשראה'];

  const handleCircleClick = (index) => {
    setCurrentGalleryIndex(index);
    setCurrentImageIndex(0);
    setOpenGallery(true);
  };

  const closeGallery = () => {
    setOpenGallery(false);
    setCurrentImageIndex(0); // איפוס האינדקס כאשר הגלריה נסגרת
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media[currentGalleryIndex].length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + media[currentGalleryIndex].length) % media[currentGalleryIndex].length);
  };

  const currentMedia = media[currentGalleryIndex][currentImageIndex];
  const isVideo = currentMedia.endsWith('.mp4'); // בדיקה אם הקובץ הוא וידאו

  // פונקציה לסגירה בלחיצה מחוץ לגלריה
  const handleClickOutside = (event) => {
    if (galleryRef.current && !galleryRef.current.contains(event.target)) {
      closeGallery();
    }
  };

  // הוספת מאזין לאירועים
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // פונקציה שמבצע את הגדרת עוצמת הקול לאחר פתיחת הגלריה
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.volume = 0.6; // הגדר עוצמת קול ל-60%
      videoRef.current.play(); // הפעל את הווידאו אם הוא פתוח
    }
  }, [isVideo, openGallery]); // פעולה זו תופעל כאשר יש שינוי ב-isVideo או openGallery

  return (
    <div className="highlight-container">
      {titles.map((title, index) => (
        <div key={index} className="circle-container">
          <div className={`circle circle${index + 1}`} onClick={() => handleCircleClick(index)}></div>
          <div className="circle-title">{title}</div>
        </div>
      ))}

      {openGallery && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery" ref={galleryRef} onClick={(e) => e.stopPropagation()}>
            <div className="gallery-arrow left-arrow" onClick={goToPreviousImage}>◀</div>
            <div className="gallery-content">
              {isVideo ? (
                <video ref={videoRef} src={currentMedia} autoPlay controls={false} />
              ) : (
                <img src={currentMedia} alt="Gallery" />
              )}
            </div>
            <div className="gallery-arrow right-arrow" onClick={goToNextImage}>▶</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
