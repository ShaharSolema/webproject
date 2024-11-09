const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Bug = require('../models/BugReport');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');

// התחברות ל-MongoDB
mongoose.connect(require('../config/config').db.uri);

// מערך שמות באנגלית (מקבילים לשמות בעברית)
const firstNamesEn = ['Shira', 'Michal', 'Rotem', 'Noa', 'Liat', 'Dana', 'Yael', 'Orly'];
const firstNamesHe = ['שירה', 'מיכל', 'רותם', 'נועה', 'ליאת', 'דנה', 'יעל', 'אורלי'];
const lastNamesEn = ['Cohen', 'Levi', 'Peretz', 'Avraham', 'David', 'Mizrachi', 'Biton'];
const lastNamesHe = ['כהן', 'לוי', 'פרץ', 'אברהם', 'דוד', 'מזרחי', 'ביטון'];

// מערך ערים בישראל
const cities = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'רמת גן', 'הרצליה', 'רעננה', 'כפר סבא'];
const streets = ['הרצל', 'ביאליק', 'רוטשילד', 'אלנבי', 'דיזנגוף', 'בן גוריון', 'ויצמן', 'ז׳בוטינסקי'];
const shippingMethods = ['pickup', 'israel-post', 'courier'];
const orderStatuses = ['received', 'packed', 'shipped', 'delivered', 'cancelled'];
const bugStatuses = ['new', 'in-progress', 'resolved'];
const bugPriorities = ['low', 'medium', 'high'];

// פונקציה ליצירת מספר כרטיס אשראי תקין
const generateValidCreditCard = () => {
  return '4580-0000-0000-0000'; // דוגמה למספר כרטיס תקין
};

// פונקציה ליצירת תאריך תפוגה תקין
const generateValidExpiry = () => {
  const currentYear = new Date().getFullYear();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = currentYear + Math.floor(Math.random() * 5);
  // פורמט: MM-YY (לפי הוולידציה בסכמה)
  return `${month.toString().padStart(2, '0')}-${year.toString().slice(-2)}`;
};

// פונקציה ליצירת משתמש רנדומלי
const createRandomUser = async () => {
  const nameIndex = Math.floor(Math.random() * firstNamesEn.length);
  const lastNameIndex = Math.floor(Math.random() * lastNamesEn.length);
  
  // שמות באנגלית לשם משתמש
  const firstnameEn = firstNamesEn[nameIndex];
  const lastnameEn = lastNamesEn[lastNameIndex];
  
  // שמות בעברית לשדות firstname ו-lastname
  const firstname = firstNamesHe[nameIndex];
  const lastname = lastNamesHe[lastNameIndex];
  
  // יצירת שם משתמש באנגלית עם מספר רנדומלי
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const username = `${firstnameEn.toLowerCase()}${randomNum}`;
  
  const email = `${username}@example.com`;
  
  // סיסמה באורך 10 תווים שעומדת בכל הדרישות
  const password = `Test${randomNum}!Aa`;
  
  return {
    firstname,
    lastname,
    username,
    email,
    password,
    phone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    isAdmin: Math.random() < 0.1, // 10% סיכוי להיות מנהל
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
  };
};

// פונקציה ליצירת הזמנה רנדומלית
const createRandomOrder = async (userId, products) => {
  const numItems = Math.floor(Math.random() * 5) + 1;
  const items = [];
  let totalAmount = 0;

  for (let i = 0; i < numItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const price = product.price * (1 - (product.discount || 0) / 100);
    
    items.push({
      productId: product._id,
      quantity,
      price
    });
    
    totalAmount += price * quantity;
  }

  const cardNumber = generateValidCreditCard();
  
  return {
    user: userId,
    items,
    totalAmount,
    status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
    shippingMethod: shippingMethods[Math.floor(Math.random() * shippingMethods.length)],
    shippingAddress: {
      street: `${streets[Math.floor(Math.random() * streets.length)]} ${Math.floor(Math.random() * 150) + 1}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      zipCode: Math.floor(Math.random() * 900000) + 100000,
      phone: `05${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`
    },
    paymentDetails: {
      cardHolder: `${firstNamesEn[Math.floor(Math.random() * firstNamesEn.length)]} ${lastNamesEn[Math.floor(Math.random() * lastNamesEn.length)]}`,
      cardNumber: '4580000000000000',
      expiry: generateValidExpiry(),
      lastFourDigits: '0000'
    },
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
  };
};

// פונקציה ליצירת עגלה רנדומלית
const createRandomCart = async (userId, products) => {
  const numItems = Math.floor(Math.random() * 4) + 1;
  const items = [];

  for (let i = 0; i < numItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    items.push({
      productId: product._id,
      quantity: Math.floor(Math.random() * 3) + 1
    });
  }

  return {
    userId,
    items
  };
};

// פונקציה ליצירת דיווח באג רנדומלי
const createRandomBug = async (userId) => {
  const titles = [
    'בעיה בתשלום',
    'המוצר לא נוסף לעגלה',
    'שגיאה בהתחברות',
    'בעיה בהצגת תמונות',
    'הזמנה לא התקבלה'
  ];
  
  const descriptions = [
    'לא הצלחתי להשלים את התשלום',
    'ניסיתי להוסיף מוצר לעגלה אבל זה לא עבד',
    'קיבלתי הודעת שגיאה בהתחברות',
    'התמונות לא נטענות כראוי',
    'לא קיבלתי איש��ר על ההזמנה'
  ];

  return {
    userId,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    status: bugStatuses[Math.floor(Math.random() * bugStatuses.length)],
    priority: bugPriorities[Math.floor(Math.random() * bugPriorities.length)],
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
  };
};

// פונקציה ראשית להוספת נתונים
const seedDatabase = async () => {
  try {
    // מחיקת כל הנתונים הקיימים חוץ מהמוצרים
    await User.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Bug.deleteMany({});

    // קבלת כל המוצרים הקיימים
    const products = await Product.find({});
    
    // יצירת משתמשים
    const users = [];
    for (let i = 0; i < 50; i++) {
      try {
        const userData = await createRandomUser();
        const user = await User.create(userData);
        users.push(user);
        
        // יצירת הזמנות לכל משתמש
        const numOrders = Math.floor(Math.random() * 4);
        for (let j = 0; j < numOrders; j++) {
          const orderData = await createRandomOrder(user._id, products);
          await Order.create(orderData);
        }
        
        // יצירת עגלה למשתמש (50% סיכוי)
        if (Math.random() > 0.5) {
          const cartData = await createRandomCart(user._id, products);
          await Cart.create(cartData);
        }
        
        // יצירת דיווחי באגים (20% סיכוי)
        if (Math.random() > 0.8) {
          const bugData = await createRandomBug(user._id);
          await Bug.create(bugData);
        }
      } catch (error) {
        console.error(`Error creating user ${i + 1}:`, error.message);
        continue; // המשך ליצירת המשתמש הבא גם אם נכשל
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// הפעלת הסקריפט
seedDatabase(); 