import React, { useState, useEffect, useCallback } from 'react';
import Carousel from 'react-bootstrap/Carousel'; 
import '../../styles/Testimonials.css'; 
import yasmin from '../data/pictures/pictures/recco/yasmin.jpeg';
import mayyan from '../data/pictures/pictures/recco/mayyanbar.png';
import shoval from '../data/pictures/pictures/recco/shoval ef.png';
import tsila  from '../data/pictures/pictures/recco/tsila.png';
import inbar  from '../data/pictures/pictures/recco/inbar.png';
import ziv from '../data/pictures/pictures/recco/ziv bar.png';
import noa from '../data/pictures/pictures/recco/noa.png';
import milena from '../data/pictures/pictures/recco/milena.png';
import mor  from '../data/pictures/pictures/recco/mor.png';
import libi  from '../data/pictures/pictures/recco/libi.jpeg';
import ilana  from '../data/pictures/pictures/recco/ilana.png';
import efrat from '../data/pictures/pictures/recco/efrat.png';



const testimonials = [
  { id: 1, image: yasmin, instagramTag: '@yasmin_nails',courseType:'קורס מתחילות', text: '" מיכל מהממת,מקצועית, קשובה וסבלנית. הקורס שלה מלמד את כל הבסיס והיסודות בצורה מסודרת, מקיפה ומעמיקה. אני ממליצה בחום על הקורס שלה. היא נותנת יחס אישי לכל אחת, עוזרת לה בדיוק בנקודות שהיא צריכה, ויודעת גם לדייק את המענה מול כל תלמידה. האווירה בקורס הייתה כיפית,קלילה ונעימה וזה לא מובן שיש מקום שאפשר להגיע אליו ולהתמקד בטוב ובעשייה. הגישה שלה תמיד חיובית ומורגש כמה היא משקיעה בללמד מכל הלב ולהעניק מהידע המטורף שיש לה. ממליצה לכל מי ששוקלת ללמוד את המקצוע, לא לפספס את ההזדמנות להגיע ללמוד אצלה!' },
  { id: 2, image: mayyan, instagramTag: '@mayaan.na',courseType:'קורס העלאת רמה', text: '״ הגעתי ללמוד אצלך אחרי שמורן סיפרה לי על כמה את נעימה וכמה את מקצועית. היה לי חשוב להנות מהדרך ולא רק ללמוד ובהחלט נהנתי מכל התהליך ולמדתי להכיר בן אדם מדהים ומקצועי. עקבתי אחריך שנה באינסטגרם לפני שהגעתי ושמחתי לראות שהוא לא פועל מתוך מקום שיווקי אלא באמת מציג את המקצועיות שלך כמו שהיא״' },
  { id: 3, image:shoval , instagramTag: '@shovale.nails',courseType:'קורס מתחילות' ,text: '״ הייתי בקורס מתחילות מורחב מהלק ועד העסק ואני כולכך ממליצה עליו. היחס הוא אישי וחם ולכל שאלה ועזרה שאני צריכה את שם בשבילי מחזקת את הביטחון שלי ודואגת שאני אעשה ואצליח. הייתי מחכה בקוצר רוח לקראת הקורס ללמוד עוד בצורה מרתקת וקלילה והחוברת שקיבלנו ממך בתחילת הקורס נותן הרגשה של רוגע שהכל נמצא למקרה שצריך לוודא שעשיתי הכל נכון וכמו שצריך תודה רבה לך על הכל💗״' },
  { id: 4, image: inbar, instagramTag: '@inbarnails',courseType:'קורס מתחילות' ,text: '"הגעתי עם ידע בסיסי לחלוטין והעשרת לי אותו יותר, למדתי ממך המון טכניקות  ודברים שלא חשבתי שאוכל לבצע . האווירה ממש טובה חיובית וכיפית.. את נותנת את תשומת הלב למי שצריכה ומקפידה שאכן כל אחת תקבל מענה על השאלות. עצם זה שהקורס עם מספר בנות קטן זה מה שתורם להכל כי יש את היכול לתת מענה לכולם. הצחוקים וההרשה שיש גב ולא צריך לפחד לעשות דברים כי את נותנת הרגשה של גם אם טעית לא נורא אפשר לתקן. השיעורים המעשיים נותנים לנו להבין את החומר בצורה הכי טובה גם בתור מתחילה סיימתי עם קצת יותר ביטחון. ברור שלגמריי ממליצה, המחיר נגיש , הערכה שניתנת גם מושלמת ובכלל כל ההיענות אחרי הקורס , יש כאלה שלא נותנים להן את זה בקורסים אחרים ואצלך זה קיים, עשיתי בחירה טובה ואני לא מתחרטת עלייה בכלל!' },
  { id: 5, image: tsila, instagramTag: '@tsilanailsa',courseType:'קורס מתחילות' ,text: '"עשיתי אצל מיכל קורס מתחילות, ואני ממליצה ממש! , מיכל מהממת וסבלנית , היה לי כיף ללמוד אצלה, ואני מרגישה שיצאתי עם ידע ומיומנות ומקצועיות. ויותר מהכל זה המענה שהיא נותנת גם אחרי הקורס, לדעת שהיא זמינה ולא נעלמת פתאום זה בעיני לא פחות חשוב. אז ממליצה לכל מי שרוצה ללמוד/ להעלות רמה ולהמקצע , ללכת וללמוד אצל מיכל❤️"' },
  { id: 6, image: ziv, instagramTag: '@ziv_bar_nails',courseType:'קורס מתחילות' ,text: '" הקורס מתחילות היה מושלם 💗 , היה לי ממש כיף, מצחיק ומלמד . אהבתי שזה היה קצת בנות וככה יכלת להתייחס לכל אחת. ממש אהבתי שדייקת אותנו וגם היית בשבילנו מחוץ לשיעורים. ממש אהבתי שקיבלנו חוברת ממש מסודרת עם כללל המידע , זה עזר לי מאוד. החיבור והאווירה היו לי מאוד חשובים וכבר שדיברנו בטלפון הבנתי שיש חיבור 💗. מעריכה גם את המענה והעזרה אחרי הקורס"' },
  { id: 7, image: noa , instagramTag: '@noamog.nails',courseType:'סדנת דמויות', text: '"מיכל מהממת. אין מילים מפי להודות לך על הקורס הנפלא שלך, לפני שהגעתי אלייך היו לי קצת חששות שאולי לא אקבל את הכלים והטכניקה שתעזור לי לצייר הכל ולא רק את הדמויות שהיו בקורס אבל יצאתי בלי שאלות בכלל!. העברת את החומר בצורה מדוייקת וסבלנית, דייקת אותי בדיוק בכל תנועה וזווית. יותר מזה נתת לי טכניקה שאני יכולה ליישם על כל תמונה / דמות שאני רק רוצה. השרת אווירה של למידה וכיף וכל העמדה הייתה מסודרת בצורה נכימה לעין ונוחה לתפעול. אין עלייך בעולם!!💓"' },
  { id: 8, image:milena , instagramTag: '@milena.n.a',courseType:'סדנת דמויות ', text: '"הגעתי למיכל לסדנת ציור דמויות. למדתי את הטכניקות שהייתי צריכה, איזה חומרים , איזה מכחולים והכל ברמה ממש גבוהה. הפדנטיות על הפרטים הקטנים והיחס האישי ש"עד שלא תצליחי אני לא משחררת ממך!", זה מה שעזר לי להגיע לתוצאה הכי טובה בציור דמויות ואפילו לא רק, בעיצובים בציפורניים בכללי, העלה לי את הבטחון שכל אחת יכולה לעשות את זה כשיש דרך עבודה נכונה 💓"' },
  { id: 9, image:mor , instagramTag: '@mt_nails',courseType:'סדנת דמויות', text: '"עברתי אצלך לפני כחצי שנה בערך סדנת דמויות וחייבת להגיד לך שהידע שהעברת שמהלך הקורס הוא פשוא מושלם!! עוזר לי בכל כך הרבה!! המשפט הראשון שאמרתי לך זה " אם את רואה שאין לי את זה פשוט תגידי מראש" ואת ציחקקת ואמרת לי חכי. יש לציין שחיכיתי , הקשבתי והפנמתי והתוצאות פשוט מדברות בעד עצמן!!! שמחה שהגעתי אלייך והכרית אותך 💓💓💓"' },
  { id: 10, image:libi , instagramTag: '@libiyaoznails',courseType:'השתלמות קישוטים', text: '"אני הייתי אצל מיכל בהשתלמות קישוטים לפני בערך כשלושה חודשים וזה הדבר הכי טוב שעשיתי בחיים שלי! הקורס מדהים וברור עם היחס הכי אישי שיש ואין סיכוי שתצאי בהרגשה רעה. כמובן שמיכל הייתה זמינה לכל עבודה שהרגשתי גאה בה או לשאלות וזה לא רק הקפיץ לי את הקישוטים , אלא ממש את כל העבודות. הכי ממליצה בעולם ונראה לי אבוא לעוד השתלמות בהמשך חד משמעית!"' },
  { id: 11, image:ilana, instagramTag: '@ilanonailse',courseType:'השתלמות קישוטים', text: '"אחותי נתנה לי מתנה השתלמות קישוטים לציפורניים אצל מיכל. לפני ההשתלמות לא באמת ידעתי איך להתחיל דוגמאות מעניינות בציפורניים.... מאז ההשתלמות אני מרגישה הרבה יותר ביטחון ומוכנה לנסות דברים חדשים(מה שלא הייתי מוכנה קודם לעשות)... ממליצה בחום על הקורס!!"' },
  { id: 12, image: efrat, instagramTag: '@efratsy.nails',courseType:'השתלמות קישוטים', text: '"הכי שמחה בעולםם שהלכתי אלייך להשתלמות קישוטים, פצח לי צוהר לעולם חדש שלא היה לי מושג בו. הכל מונגש בפשטות, בקלות ובבהירות, היחס המדהים שלך שתמיד האמנת שאצליח לא משנה מה משתבש בדרך. מההשתלמות ועד עכשיו עבר שנה פלוס וכל שאלה שהיתה לי(והיו מלא) , תמיד ענית בסבלנות ובפירוט ואף פעם לא נותרו לי סימני שאלה. האווירה בקורס היתה מעולה, קלילה וכיפית, אני הכי מרוצה וממליצה עלייך בעולם!!!!💓💓💓"' },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0); // Used to reset interval timer

  // Create chunked testimonials array
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunkedTestimonials.push(testimonials.slice(i, i + 3));
  }

  // Handle manual navigation
  const handleSelect = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
    setKey(prev => prev + 1); // Reset interval by updating key
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === chunkedTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [key, chunkedTestimonials.length]); // Reset when key changes

  return (
    <div className="testimonials">
      <h2>לקוחות ממליצות</h2>
      <Carousel
        controls={true}
        indicators={false}
        interval={null} // Disable Bootstrap's built-in interval
        slide={true}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      >
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
                  <p className="course-type">סוג הקורס: {testimonial.courseType}</p>
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