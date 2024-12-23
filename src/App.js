import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Highlights from "./pages/Highlights";
import Preferences from "./pages/Preferences";
import Header from "./components/Header";

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Enable dark mode by default

  // Toggle dark mode when button is clicked
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-primary text-textPrimary`}>
        {/* Dark Mode Toggle Button */}
        <button
          className="fixed bottom-5 right-5 bg-accent text-white p-2 rounded-full"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
