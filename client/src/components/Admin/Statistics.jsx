import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatisticsPage = () => {
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
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

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axiosInstanse.get(API_ROUTES.STATISTICS.MONTHLY_INCOME, {
        withCredentials: true,
      });
      setMonthlyIncome(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        await Promise.all([
          fetchUserRegistrations(),
          fetchProductSales(),
          fetchCartItems(),
          fetchMonthlyIncome()
        ]);
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

  const incomeChartData = {
    labels: monthlyIncome.map(data => data.month),
    datasets: [
      {
        label: 'הכנסה חודשית',
        data: monthlyIncome.map(data => data.totalIncome),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Heebo', sans-serif"
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Heebo', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Heebo', sans-serif"
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>שגיאה!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="statistics-page">
      <div className="statistics-header">
        <h1>סטטיסטיקה</h1>
        <p>ניתוח נתונים ומגמות</p>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h2>רישום משתמשים לפי חודש</h2>
          <div className="chart-wrapper">
            <Bar 
              data={registrationChartData} 
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h2>מכירת מוצרים</h2>
          <div className="chart-wrapper">
            <Bar 
              data={productSalesChartData} 
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h2>מוצרים בעגלה</h2>
          <div className="chart-wrapper">
            <Pie 
              data={cartItemsChartData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'right'
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="chart-card">
          <h2>הכנסה חודשית</h2>
          <div className="chart-wrapper">
            <Line 
              data={incomeChartData} 
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                      callback: (value) => `₪${value}`
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
