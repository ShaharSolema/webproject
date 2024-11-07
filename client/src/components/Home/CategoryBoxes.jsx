import 'react'; // ייבוא React
import '../../styles/CategoryBoxes.css'; // ייבוא קובץ CSS
import image1 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.22 (1).jpeg';
import image2 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.24 (1).jpeg';
import image3 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.22 (2).jpeg';
import image4 from '../data/pictures/pictures/Examples/WhatsApp Image 2024-11-03 at 22.21.26.jpeg';



const categories = [
  { name: 'חנות מוצרים', image:image1, link: '/productstore' },
  { name: 'קורסים והשתלמויות', image: image2, link: '/workshops' },
  { name: 'שאלות נפוצות', image: image3, link: '/beginner' },
  { name: 'קצת עליי', image:image4, link: '/advanced' },
];

const CategoryBoxes = () => {
  return (
    <div className="category-boxes">
      {categories.map((category, index) => (
        <a href={category.link} key={index} className="category-box">
          <img src={category.image} alt={category.name} className="category-image" />
          <div className="category-name">{category.name}</div>
        </a>
      ))}
    </div>
  );
};

export default CategoryBoxes;
