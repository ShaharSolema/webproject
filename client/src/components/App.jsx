import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ייבוא רכיבים
import { useEffect } from 'react';
import Header from './Constant/Header';
import Footer from './Constant/Footer';
import FloatingIcon from './Constant/Floatingicon';
import Home from './Home/Home';
import ProductStore from './ProductStore'; // ייבוא רכיב החנות
import About from './About';
import FAQ from './FAQ';
import RegistrationForm from "./RegistrationForm";
import Highlight from '../components/Home/Highlight'; // ייבוא רכיב ההיילייט
import UsersUpdate from './Admin/UsersUpdate';
import Statistics from './Admin/Statistics';
import BeginnerCourses from './BeginnerCourses'; // ייבוא קורסים למתחילים
import AdvancedCourses from './AdvancedCourses'; // ייבוא קורסים מתקדמים
import Workshops from './Workshops'; // ייבוא סדנאות
import ProductsManagement from './Admin/ProductsManagement';
import MarqueeFooter from './Constant/MarqueeFooter';
import '../styles/main.css';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';
import OrderManagement from './Admin/OrderManagement';
import OrderHistory from './OrderHistory';
import BugManagement from './Admin/BugManagement';
import ProtectedAdminRoute from '../utils/ProtectedAdminRoute';



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
          <Route path="/highlight" element={<Highlight />} />
          <Route path="/productstore" element={<ProductStore />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/usersadmin" element={
            <ProtectedAdminRoute>
              <UsersUpdate />
            </ProtectedAdminRoute>
          } />
          <Route path="/statistics" element={
            <ProtectedAdminRoute>
              <Statistics />
            </ProtectedAdminRoute>
          } />
          <Route path="/productsmanagement" element={
            <ProtectedAdminRoute>
              <ProductsManagement />
            </ProtectedAdminRoute>
          } />
          <Route path="/ordersmanagement" element={
            <ProtectedAdminRoute>
              <OrderManagement />
            </ProtectedAdminRoute>
          } />
          <Route path="/bugmanagement" element={
            <ProtectedAdminRoute>
              <BugManagement />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </div>
      <FloatingIcon />
      <Footer />
      <MarqueeFooter/>
    </Router>
  );
}

export default App;
