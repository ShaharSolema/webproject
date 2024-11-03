// src/App.jsx
import React from 'react';
import Header from './Constant/Header';
import Footer from './Constant/Footer';
import FloatingIcon from './Constant/FloatingIcon';
import Home from './Home/Home';
import Courses from './Courses';
import ProductStore from './ProductStore'; // ייבוא רכיב החנות
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import RegistrationForm from "./RegistrationForm";
import Highlight from '../components/Home/Highlight'; // ייבוא רכיב ההיילייט
import UsersUpdate from './Admin/UsersUpdate'
import UserUpdateForm from './UserUpdateForm';

import '../styles/main.css';

function App() {
  const containerStyles = {
    padding: '0px',
    paddingTop: '80px',
    paddingBottom: '0',
    minHeight: '100vh', // כדי שהמיכל יתפוס את כל גובה המסך
    boxSizing: 'border-box',
    padding: '20px',
    paddingTop: '80px',
    paddingBottom: '0',
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
};

    justifyContent: 'space-between',
  };

  return (
    <Router>
      <Header />
      <div className="container" style={containerStyles}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/productstore" element={<ProductStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/highlight" element={<Highlight />} />
          <Route path="/usersadmin" element ={<UsersUpdate/>} />
          <Route path="/userupdate" element ={<UserUpdateForm/>} />
        </Routes>
        <FloatingIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
