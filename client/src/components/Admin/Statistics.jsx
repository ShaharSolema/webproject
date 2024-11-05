import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { API_ROUTES } from '../../utils/apiRoutes';
import axiosInstanse from '../../utils/axiosConfig';
import '../../styles/Statics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsPage = () => {
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRegistrations = async () => {
    try {
      const response = await axiosInstanse.get(API_ROUTES.STATISTICS.USER_REGISTRATIONS, {
        withCredentials: true,
      });
      setUserRegistrations(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProductSales = async () => {
    try {
      const response = await axiosInstanse.get(API_ROUTES.STATISTICS.PRODUCT_SALES, {
        withCredentials: true,
      });
      setProductSales(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstanse.get(API_ROUTES.STATISTICS.CART_ITEMS, {
        withCredentials: true,
      });
      setCartItems(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        await fetchUserRegistrations();
        await fetchProductSales();
        await fetchCartItems();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const registrationChartData = {
    labels: userRegistrations.map((reg) => `Month ${reg.month}`),
    datasets: [
      {
        label: 'מספר נרשמים',
        data: userRegistrations.map((reg) => reg.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const productSalesChartData = {
    labels: productSales.map((sale) => sale.productName),
    datasets: [
      {
        label: 'כלל המכירות',
        data: productSales.map((sale) => sale.totalSales),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const cartItemsChartData = {
    labels: cartItems.map((item) => item.productName),
    datasets: [
      {
        label: 'מוצרים בעגלה',
        data: cartItems.map((item) => item.totalQuantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
        ].slice(0, cartItems.length), // Limit colors to the number of cart items
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="statistics-page">
      <h1>סטטיסטיקה</h1>
      
      <div className="charts-container">
        <div className="chart-card">
          <h2>רישום משתמשים לפי חודש</h2>
          <Bar data={registrationChartData} options={{ responsive: true, maintainAspectRatio: false }} style={{ height: '100%' }} />
        </div>

        <div className="chart-card">
          <h2>מכירת מוצרים</h2>
          <Bar data={productSalesChartData} options={{ responsive: true, maintainAspectRatio: false }} style={{ height: '100%' }} />
        </div>

        <div className="chart-card" style={{ flex: '1 1 100%' }}> {/* שורה חדשה עבור הגרף השלישי */}
          <h2>מוצרים בעגלה</h2>
          <Pie data={cartItemsChartData} options={{ responsive: true, maintainAspectRatio: false }} style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
