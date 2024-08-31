import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './components/Login';
import Courses from './components/Courses';
import ProductStore from './components/ProductStore';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import '..styles/main.css'
function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/product-store" element={<ProductStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
