import { useEffect, useState } from "react";
import ButtonGroup from "../ButtonGroup";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [username, setUsername] = useState("אורח");
  const [hebrewDate, setHebrewDate] = useState("");

  useEffect(() => {
    const getNameFromLocalStorage = () => {
      const userString = localStorage.getItem('user');
      if (!userString) return null; // Return null if no user data exists

      try {
        const userData = JSON.parse(userString);
        return userData.name; // Extract and return the name
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return null; // Return null if parsing fails
      }
    };

    const currUsername = getNameFromLocalStorage();
    if (currUsername) {
      setUsername(currUsername); // Set username if available
    }

    // Function to update username from local storage
    const updateUsername = () => {
      const updatedName = getNameFromLocalStorage();
      if (updatedName && updatedName !== username) {
        setUsername(updatedName);
      }
    };

    window.addEventListener('storage', updateUsername);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', updateUsername);
    };
  }, []); // No need for username in dependency array, only run on mount

  const convertToHebrewNumber = (number) => {
    // For days only (not years)
    const hebNumbers = {
      1: 'א',
      2: 'ב',
      3: 'ג',
      4: 'ד',
      5: 'ה',
      6: 'ו',
      7: 'ז',
      8: 'ח',
      9: 'ט',
      10: 'י',
      20: 'כ',
      30: 'ל',
      40: 'מ',
      50: 'נ',
      60: 'ס',
      70: 'ע',
      80: 'פ',
      90: 'צ'
    };

    // For single-digit numbers (days)
    if (number < 10) {
      return hebNumbers[number] + "'";
    }

    return '';
  };

  const convertYearToHebrew = (year) => {
    // Subtract 5000 from the year
    const yearAfter5000 = year - 5000;
    
    // Convert the remaining number
    // For year 5784, yearAfter5000 would be 784
    // We want התשפ"ד
    return 'התשפ"ד';
  };

  useEffect(() => {
    const fetchHebrewDate = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
          `https://www.hebcal.com/converter?cfg=json&date=${today}&g2h=1`
        );
        const data = await response.json();
        
        const hebrewMonths = {
          Nisan: 'ניסן',
          Iyyar: 'אייר',
          Sivan: 'סיון',
          Tamuz: 'תמוז',
          Av: 'אב',
          Elul: 'אלול',
          Tishrei: 'תשרי',
          Cheshvan: 'חשון',
          Kislev: 'כסלו',
          Tevet: 'טבת',
          Shvat: 'שבט',
          Adar: 'אדר',
          'Adar I': 'אדר א',
          'Adar II': 'אדר ב'
        };

        // Convert day to Hebrew numeral
        const hebrewDay = convertToHebrewNumber(data.hd);
        
        // For now, hardcode the year as התשפ"ד
        const hebrewYear = 'התשפ"ד';

        // Format the Hebrew date
        const formattedDate = `${hebrewDay} ${hebrewMonths[data.hm]} ${hebrewYear}`;
        setHebrewDate(formattedDate);
      } catch (error) {
        console.error("Failed to fetch Hebrew date:", error);
      }
    };

    fetchHebrewDate();
    const interval = setInterval(fetchHebrewDate, 3600000);
    return () => clearInterval(interval);
  }, []);

  const headerStyles = {
    padding: "0.5rem 0",
    height: "80px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const dateContainerStyles = {
    background: '#f8f9fa',
    padding: '4px 12px',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    transition: 'all 0.3s ease',
    cursor: 'default',
    fontSize: '0.8rem',
    color: '#555',
    fontFamily: 'calibri',
    direction: 'rtl',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    marginRight: '15px',
    height: 'fit-content',
    position: 'relative',
    top: '7px',
    marginTop: '2px'
  };

  const rightColumnStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%'
  };

  const calendarIconStyles = {
    fontSize: '0.9rem',
    color: '#666',
    marginLeft: '4px'
  };

  return (
    <header 
      className="row fixed-top bg-white"
      style={headerStyles}
    >
      {/* Left column with buttons */}
      <div className="col d-flex align-items-center justify-content-start">
        <ButtonGroup />
      </div>

      {/* Center column with logo */}
      <div className="col-6 d-flex justify-content-center align-items-center">
        <Logo />
      </div>

      {/* Right column with Hebrew date and dropdown menu button */}
      <div className="col" style={rightColumnStyles}>
        {hebrewDate && (
          <div 
            className="hebrew-date" 
            style={dateContainerStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
          >
            <i className="bi bi-calendar3" style={calendarIconStyles}></i>
            {hebrewDate}
          </div>
        )}
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
