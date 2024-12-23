import React, { useState } from "react";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { 
  FaCog, 
  FaBaseballBall, 
  FaBell, 
  FaSave, 
  FaCheckCircle,
  FaTeamspeak 
} from "react-icons/fa";

const Preferences = () => {
  // Animations
  const heroAnimation = useSpring({ 
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 14 }
  });

  const sectionTrail = useTrail(3, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 5, tension: 2000, friction: 200 }
  });

  // State Management
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    gameMoments: true,
    weeklyDigest: false,
    playerUpdates: false
  });

  // Predefined Data
  const teams = [
    { name: "Yankees", logo: "⚾", color: "text-navy" },
    { name: "Red Sox", logo: "🧢", color: "text-red-600" },
    { name: "Dodgers", logo: "🌟", color: "text-blue-500" },
    { name: "Astros", logo: "🚀", color: "text-orange-500" },
    { name: "Cubs", logo: "🐻", color: "text-blue-800" },
    { name: "Mets", logo: "🌉", color: "text-blue-400" },
    { name: "Giants", logo: "🌉", color: "text-orange-700" },
    { name: "Cardinals", logo: "🃏", color: "text-red-700" }
  ];

  // Handlers
  const handleTeamToggle = (teamName) => {
    setSelectedTeams((prev) =>
      prev.includes(teamName)
        ? prev.filter((t) => t !== teamName)
        : [...prev, teamName]
    );
  };

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSavePreferences = () => {
    // Simulated save with animation
    alert("Preferences Saved Successfully!");
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <animated.div 
        style={heroAnimation} 
        className="text-center py-16 px-4 relative container mx-auto max-w-6xl"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10 opacity-50"></div>
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Personalize Your Experience
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Customize your baseball platform with personalized team selections and notification preferences
        </p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
            <FaCog className="mr-2 text-blue-500" />
            <span>Preference Settings</span>
          </div>
        </div>
      </animated.div>

      {/* Teams Selection */}
      <animated.div style={sectionTrail[0]} className="px-6 py-10 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <FaBaseballBall className="mr-4 text-blue-500" /> Favorite Teams
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {teams.map((team) => (
            <div
              key={team.name}
              onClick={() => handleTeamToggle(team.name)}
              className={`p-4 rounded-lg text-center cursor-pointer transition-all group ${
                selectedTeams.includes(team.name)
                  ? "bg-blue-600 scale-105 shadow-2xl"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              <div className={`text-4xl mb-2 ${team.color}`}>
                {team.logo}
              </div>
              <h3 className={`font-bold ${
                selectedTeams.includes(team.name) 
                  ? "text-white" 
                  : "text-gray-300 group-hover:text-white"
              }`}>
                {team.name}
              </h3>
            </div>
          ))}
        </div>
      </animated.div>

      {/* Notification Settings */}
      <animated.div style={sectionTrail[1]} className="px-6 py-10 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <FaBell className="mr-4 text-yellow-500" /> Notification Preferences
        </h2>
        <div className="space-y-4">
          {Object.keys(notificationSettings).map((key) => (
            <div 
              key={key} 
              className="flex items-center justify-between bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center">
                {key === "gameMoments" && <FaBaseballBall className="mr-4 text-blue-500" />}
                {key === "weeklyDigest" && <FaTeamspeak className="mr-4 text-green-500" />}
                {key === "playerUpdates" && <FaCheckCircle className="mr-4 text-purple-500" />}
                <span className="text-lg font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors ${
                  notificationSettings[key] ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                    notificationSettings[key] ? "translate-x-7" : ""
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </animated.div>

      {/* Save Preferences Button */}
      <animated.div style={sectionTrail[2]} className="text-center py-16 bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Customize?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Your personalized baseball experience is just a click away
          </p>
          <button
            onClick={handleSavePreferences}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-xl font-semibold transition-all duration-300 flex items-center mx-auto hover:scale-105"
          >
            <FaSave className="mr-4" /> Save Preferences
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default Preferences;