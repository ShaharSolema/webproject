import 'react'; // עדכון ייבוא ל-React
import Carousel from 'react-bootstrap/Carousel'; // נייבא את רכיב הקרוסלה
import '../../styles/Testimonials.css'; // הוספת ייבוא לקובץ CSS (אם קיים)

const testimonials = [
  {
    id: 1,
    image: 'https://static.wixstatic.com/media/b05084_92d234284ae144889fac027e8db49ca6~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
  {
    id: 2,
    image: 'https://static.wixstatic.com/media/b05084_92d234284ae144889fac027e8db49ca6~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
  {
    id: 3,
    image: 'https://static.wixstatic.com/media/b05084_92d234284ae144889fac027e8db49ca6~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
  {
    id: 4,
    image: 'https://static.wixstatic.com/media/b05084_c9f63b895f74481fa07d047c5a401d50~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
  {
    id: 5,
    image: 'https://static.wixstatic.com/media/b05084_c9f63b895f74481fa07d047c5a401d50~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
  {
    id: 6,
    image: 'https://static.wixstatic.com/media/b05084_f372cd1814694c0f93e36c6a64648d75~mv2.jpg',
    instagramTag: '@black.cherry_nails',
    text: '"הגעתי למיכל אחריי"',
  },
];

const Testimonials = () => {
    const chunkedTestimonials = [];
  
    for (let i = 0; i < testimonials.length; i += 3) {
      chunkedTestimonials.push(testimonials.slice(i, i + 3));
    }
  
    return (
      <div className="testimonials">
        <h2>לקוחות ממליצות</h2>
        <Carousel controls={true} indicators={false}>
          {chunkedTestimonials.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="testimonial-container" style={{ display: 'flex' }}>
                {group.map((testimonial) => (
                  <div className="testimonial-box" key={testimonial.id}>
                    <img
                      src={testimonial.image}
                      alt={testimonial.instagramTag}
                      className="testimonial-image"
                    />
                    <p className="instagram-tag">{testimonial.instagramTag}</p>
                    <p className="testimonial-text">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };
  

export default Testimonials;