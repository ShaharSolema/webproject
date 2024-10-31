import React, { useState } from 'react';
import '../../styles/Highlight.css';

const Highlight = () => {
  const [openGallery, setOpenGallery] = useState(null);

  // הגדרת תמונות לכל עיגול
  const images = [
    ['one.png', 'one2.png', 'one3.png'], // תמונות לעיגול 1
    ['gone.png', 'gone2.png'], // תמונות לעיגול 2
    ['IMG-20240905-WA0019.jpg', 'IMG-20240905-WA0020.jpg'], // תמונות לעיגול 3
  ];

  // הגדרת כותרות לכל עיגול
  const titles = [
    'קורסים 1', // כותרת לעיגול 1
    'הדרכות 2', // כותרת לעיגול 2
    'מכחולים 3', // כותרת לעיגול 3
  ];

  const handleCircleClick = (index) => {
    setOpenGallery(index);
  };

  const closeGallery = () => {
    setOpenGallery(null);
  };

  return (
    <div className="highlight-container">
      <div className="pink-rectangle">
        {[1, 2, 3].map((circle, index) => (
          <div key={index} className="circle" onClick={() => handleCircleClick(index)}>
            <div className="circle-title">{titles[index]}</div>
          </div>
        ))}
      </div>

      {openGallery !== null && (
        <div className="gallery">
          <button className="close-btn" onClick={closeGallery}>X</button>
          <div className="gallery-content">
            <p>תמונות עיגול {openGallery + 1}</p>
            {/* הצגת התמונות */}
            <div className="gallery-images">
              {images[openGallery].map((img, imgIndex) => (
                <img key={imgIndex} src={require(`./path/to/images/${img}`)} alt={`תמונה ${imgIndex + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
