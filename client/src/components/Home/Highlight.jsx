import React, { useState } from 'react';
import '../../styles/Highlight.css';

const Highlight = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0); // נוסיף אינדקס לתמונות בגלריה

  const images = [
    ['../styles/pictures/one2.png', '../styles/pictures/one3.png'], // קורסים
    ['../styles/pictures/gone.png', '../styles/pictures/gone2.png'], // הדרכות
    ['../styles/pictures/IMG-20240905-WA0019.jpg', '../styles/pictures/IMG-20240905-WA0020.jpg'], // מכחולים
  ];

  const titles = ['קורסים', 'הדרכות', 'מכחולים'];

  const handleCircleClick = (index) => {
    setCurrentGalleryIndex(index); // שמירה של אינדקס הגלריה
    setCurrentImageIndex(0); // אתחול התמונה הראשונה
    setOpenGallery(true);
  };

  const closeGallery = () => {
    setOpenGallery(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images[currentGalleryIndex].length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images[currentGalleryIndex].length) % images[currentGalleryIndex].length);
  };

  return (
    <div className="highlight-container">
      {titles.map((title, index) => (
        <div key={index} className="circle-container">
          <div className={`circle circle${index + 1}`} onClick={() => handleCircleClick(index)}></div>
          <div className="circle-title">{title}</div>
        </div>
      ))}

      {openGallery && (
        <div className="gallery">
          <button className="close-btn" onClick={closeGallery}>✖</button>
          <div className="gallery-content">
            <img src={images[currentGalleryIndex][currentImageIndex]} alt="Gallery" />
          </div>
          <div className="gallery-buttons">
            <button onClick={goToPreviousImage}>◀</button>
            <button onClick={goToNextImage}>▶</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
