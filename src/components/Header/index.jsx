import { useState } from "react";
import Cookies from "js-cookie";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">School Payments Dashboard</h1>

        {/* Toggle buttons section */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded flex items-center justify-center transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {darkMode ? (
              <FiSun className="text-xl" />
            ) : (
              <FiMoon className="text-xl" />
            )}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="md:hidden px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-300"
          >
            <FiLogOut className="text-xl" />
          </button>

          {/* Logout button text (only visible on sm and larger screens) */}
          <button
            onClick={handleLogout}
            className="hidden md:inline-block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
