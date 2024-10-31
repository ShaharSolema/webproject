import { useEffect, useState } from "react";
import ButtonGroup from "../ButtonGroup";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    function getNameFromLocalStorage() {
      const userString = localStorage.getItem('user');
      if (!userString) return null; // Return null if no user data exists

      try {
        const userData = JSON.parse(userString);
        return userData.name; // Extract and return the name
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return null; // Return null if parsing fails
      }
    }

    const updateUsername = () => {
      const currUsername = getNameFromLocalStorage();
      if (currUsername !== username) {
        setUsername(currUsername);
      }
    };

    // Check username when the component mounts and on every re-render
    updateUsername();

    // Optional: Listen for storage changes in other tabs
    window.addEventListener('storage', updateUsername);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', updateUsername);
    };
  }, [username]); // Adding username to the dependency array to check for updates

  return (
    <header className="row fixed-top bg-white py-2">
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
        {username ? (
          <span className="me-3">Hello, {username}</span>
        ) : (
          <span className="me-3">Hello, Visitor</span>
        )}
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
