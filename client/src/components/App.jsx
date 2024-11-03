//App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ייבוא רכיבים
import Header from './Constant/Header';
import Footer from './Constant/Footer';
import FloatingIcon from './Constant/FloatingIcon';
import Home from './Home/Home';
import ProductStore from './ProductStore'; // ייבוא רכיב החנות
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import RegistrationForm from "./RegistrationForm";
import Highlight from '../components/Home/Highlight'; // ייבוא רכיב ההיילייט
import UsersUpdate from './Admin/UsersUpdate';
//
//import UserUpdateForm from './UserUpdateForm';
import BeginnerCourses from './BeginnerCourses'; // ייבוא קורסים למתחילים
import AdvancedCourses from './AdvancedCourses'; // ייבוא קורסים מתקדמים
import Workshops from './Workshops'; // ייבוא סדנאות

import '../styles/main.css';

function App() {
  const containerStyles = {
    padding: '0px',
    paddingTop: '80px',
    paddingBottom: '0',
    minHeight: 'calc(100vh - 60px)', // חישוב גובה מינימלי
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <Router>
      <Header />
      <div className="container" style={containerStyles}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/beginner" element={<BeginnerCourses />} /> {/* קורסים למתחילים */}
          <Route path="/advanced" element={<AdvancedCourses />} /> {/* קורסים מתקדמים */}
          <Route path="/workshops" element={<Workshops />} /> {/* סדנאות */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/highlight" element={<Highlight />} />
          <Route path="/usersadmin" element={<UsersUpdate />} />
          <Route path="/productstore" element={<ProductStore />} />
        </Routes>
        <FloatingIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
