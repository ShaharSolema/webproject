import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Constant/Header';
import Footer from './Constant/Footer';
import FloatingIcon from './Constant/FloatingIcon';
import Home from './Home/Home';
// import Cart from './Cart';
// import Profile from './Profile';
// import Login from './Login';
import Courses from './Courses';
import ProductStore from './ProductStore';
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import RegistrationForm from "./RegistrationForm";
import Highlight from '../components/Home/Highlight';  // ייבוא רכיב ההיילייט

import '../styles/main.css'

function App() {
  // הגדרת סגנונות inline
  const containerStyles = {
    padding: '20px', // הוספת padding של 20 פיקסלים מכל צד
    paddingTop: '80px',  // ריפוד נוסף לחלק העליון (בהתאם לגובה ה-HEADER שלך)
    paddingBottom: '60px', // ריפוד נוסף לחלק התחתון (בהתאם לגובה ה-FOOTER שלך)
  };

  return (
    <Router>
      <Header />
      <div className="container" style={containerStyles}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/productstore" element={<ProductStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/highlight" element={<Highlight />} /> {/* עמוד ההיילייט */}
        </Routes>
        <FloatingIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;