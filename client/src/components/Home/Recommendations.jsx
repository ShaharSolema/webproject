// import Slider from 'react-slick'; // ייבוא רכיב ה-Slider מ-react-slick

// const Recommendations = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const recommendationsData = {
//     category1: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
//     category2: ['image4.jpg', 'image5.jpg', 'image6.jpg'],
//     category3: ['image7.jpg', 'image8.jpg', 'image9.jpg']
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category === selectedCategory ? '' : category); // החלפת קטגוריה או הסתרת התוכן אם נלחץ על אותה קטגוריה
//   };

//   // הגדרות עבור Carousel
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <div className="reco">
//       {/* כפתורי בחירת קטגוריה */}
//       <button onClick={() => handleCategorySelect('category1')}>קטגוריה 1</button>
//       <button onClick={() => handleCategorySelect('category2')}>קטגוריה 2</button>
//       <button onClick={() => handleCategorySelect('category3')}>קטגוריה 3</button>

//       {/* Carousel להמלצות */}
//       {selectedCategory && (
//         <Slider {...settings}>
//           {recommendationsData[selectedCategory].map((image, index) => (
//             <div key={index}>
//               <img src={image} alt={`Recommendation ${index}`} style={{ width: '100%' }} />
//             </div>
//           ))}
//         </Slider>
//       )}
//     </div>
//   );
// };

// export default Recommendations;
