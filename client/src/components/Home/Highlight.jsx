import React, { useState } from 'react';
import '../../styles/Highlight.css';

// ייבוא התמונות והסרטונים
import Courses1 from '../../styles/pictures/Courses/One.png';
import Courses2 from '../../styles/pictures/Courses/VID-20241025-WA0020.mp4';
import Courses3 from '../../styles/pictures/Courses/VID-20241025-WA0022.mp4';
import Courses4 from '../../styles/pictures/Courses/VID-20241025-WA0023.mp4';
import Courses5 from '../../styles/pictures/Courses/VID-20241025-WA0023.mp4';
import Courses6 from '../../styles/pictures/Courses/VID-20241025-WA0020.mp4';
import Courses7 from '../../styles/pictures/Courses/VID-20241025-WA0025.mp4';
import Courses8 from '../../styles/pictures/Courses/VID-20241025-WA0026.mp4';
import Guides1 from '../../styles/pictures/Guides/gone.png';
import Guides2 from '../../styles/pictures/Guides/VID-20240905-WA0011.mp4';
import Guides3 from '../../styles/pictures/Guides/VID-20240905-WA0012.mp4';
import Guides4 from '../../styles/pictures/Guides/VID-20240905-WA0013.mp4';
import Thespringbrushes1 from '../../styles/pictures/Thespringbrushes/IMG-20240905-WA0019.jpg';
import Thespringbrushes2 from '../../styles/pictures/Thespringbrushes/IMG-20240905-WA0021.jpg';


const Highlight = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // מערך עם התמונות והסרטונים
  const media = [
    [Courses1, Courses2, Courses3, Courses4, Courses5, Courses6,Courses6,Courses7,Courses8], // קורסים
    [Guides1, Guides2, Guides3,Guides4], // הדרכות
    [Thespringbrushes1, Thespringbrushes2], // מכחולים
  ];

  const titles = ['קורסים', 'הדרכות', 'מכחולים'];

  const handleCircleClick = (index) => {
    setCurrentGalleryIndex(index);
    setCurrentImageIndex(0);
    setOpenGallery(true);
  };

  const closeGallery = () => {
    setOpenGallery(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media[currentGalleryIndex].length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + media[currentGalleryIndex].length) % media[currentGalleryIndex].length);
  };

  const currentMedia = media[currentGalleryIndex][currentImageIndex];
  const isVideo = currentMedia.endsWith('.mp4'); // בדיקה אם הקובץ הוא וידאו

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
          <div className="gallery-arrow left-arrow" onClick={goToPreviousImage}>◀</div>
          <div className="gallery-content">
            {isVideo ? (
              <video src={currentMedia} controls autoPlay />
            ) : (
              <img src={currentMedia} alt="Gallery" />
            )}
          </div>
          <div className="gallery-arrow right-arrow" onClick={goToNextImage}>▶</div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
