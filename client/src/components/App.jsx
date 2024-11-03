import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Constant/Header';
import Footer from './Constant/Footer';
import FloatingIcon from './Constant/FloatingIcon';
import Home from './Home/Home';
import Courses from './Courses';
import ProductStore from './ProductStore';
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import RegistrationForm from "./RegistrationForm";
import Highlight from '../components/Home/Highlight'; // ייבוא רכיב ההיילייט
import UsersUpdate from './Admin/UsersUpdate'

import '../styles/main.css';

function App() {
  // הגדרת סגנונות inline
  const containerStyles = {
    padding: '20px',
    paddingTop: '80px', // ריפוד עליון
    paddingBottom: '0', // הסרת ריפוד תחתון
    minHeight: 'calc(100vh - 60px)', // הכנס גובה פוטר מדויק
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // למלא את כל הגובה
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
        </Routes>
        <FloatingIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
