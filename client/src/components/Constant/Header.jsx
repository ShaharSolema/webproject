import { useEffect, useState } from "react";
import ButtonGroup from "../ButtonGroup";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [username, setUsername] = useState("אורח"); // ערך ברירת מחדל

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

    // Optional: Listen for storage changes in other tabs
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

  return (
    <header 
      className="row fixed-top bg-white"
      style={{
        padding: "0.5rem 0", // הקטנת padding
        height: "80px", // קביעת גובה קבוע ל-HEADER
      }}
    >
      {/* Left column with buttons */}
      <div className="col d-flex align-items-center justify-content-start">
        <ButtonGroup />
      </div>

      {/* Center column with logo */}
      <div className="col-6 d-flex justify-content-center align-items-center">
        <Logo />
      </div>

      {/* Right column with dropdown menu button */}
      <div className="col text-end d-flex align-items-center justify-content-end">
        <span className="me-3">היי, {username}</span>
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
