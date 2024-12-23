import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };

    // Check user's system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle("dark", prefersDarkMode);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Highlights", path: "/highlights" },
    {
      name: "Preferences",
      path: "/preferences",
      hasDropdown: true,
      dropdownItems: [
        { name: "Profile", path: "/preferences/profile" },
        { name: "Settings", path: "/preferences/settings" },
      ],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <header
    className={`
      ${isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"} 
      shadow-lg transition-colors duration-500 ease-in-out
    `}
      aria-label="Main Navigation"
    >
      <nav className="container mx-auto flex justify-between items-center p-4 max-w-7xl">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold"
        >
          <Link
            to="/"
            className={`
              transition-colors duration-300
              ${isDarkMode 
                ? "text-blue-400 hover:text-blue-300" 
                : "text-blue-600 hover:text-blue-700"
              }
            `}
            aria-label="Home"
          >
            Baseball Platform
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-8" role="menubar">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group" role="none">
                <Link
                  to={link.path}
                  className={`
                    relative py-2 transition-all duration-300 
                    ${location.pathname === link.path 
                      ? "text-blue-600 dark:text-blue-400 font-semibold" 
                      : "hover:text-blue-500"
                    }
                    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                    after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform
                  `}
                  role="menuitem"
                  onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
                >
                  {link.name}
                </Link>

                {link.hasDropdown && isDropdownOpen && (
                  <AnimatePresence>
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        absolute top-full left-0 
                        ${isDarkMode 
                          ? "bg-gray-900 text-white border-gray-800" 
                          : "bg-white text-gray-900 border-gray-200"
                        }
                        shadow-lg rounded-md mt-2 z-20 border overflow-hidden
                      `}
                    >
                      {link.dropdownItems.map((item) => (
                        <li 
                          key={item.name} 
                          className={`
                            px-4 py-2 
                            ${isDarkMode 
                              ? "hover:bg-gray-800" 
                              : "hover:bg-gray-100"
                            }
                            transition-colors duration-200
                          `}
                        >
                          <Link 
                            to={item.path}
                            className="block w-full"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Separate Theme Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className={`
              p-2 rounded-full transition-all duration-500 
              ${isDarkMode 
                ? "text-yellow-500 hover:bg-gray-900 border border-gray-800" 
                : "text-gray-800 hover:bg-gray-100"
              } 
              hover:scale-110 focus:outline-none
            `}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>
        </div>

        {/* Mobile Menu and Dark Mode Toggle */}
        <div className="flex items-center lg:hidden">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className={`
              p-2 rounded-full transition-all duration-500 mr-2
              ${isDarkMode 
                ? "text-yellow-500 hover:bg-gray-900 border border-gray-800" 
                : "text-gray-800 hover:bg-gray-100"
              } 
              hover:scale-110 focus:outline-none
            `}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? "✕" : "☰"}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu with smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            className={`
              lg:hidden 
              ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"}
              w-full p-4
            `}
          >
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`
                      block py-2 transition-all duration-300 
                      ${location.pathname === link.path 
                        ? "text-blue-600 dark:text-blue-400 font-semibold" 
                        : "hover:text-blue-500"
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;