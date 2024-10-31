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

import '../styles/main.css'

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
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
        </Routes>
        <FloatingIcon />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
