import React, { useState } from "react";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { FaBaseballBall, FaTrophy, FaPlayCircle, FaChartLine } from "react-icons/fa";

const Home = () => {
  // Fade-in and slide-up animations
  const heroAnimation = useSpring({ 
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 14 }
  });

  // Trail animation for sections
  const sectionTrail = useTrail(4, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 5, tension: 2000, friction: 200 }
  });

  // Interactive state for video previews
  const [activeVideo, setActiveVideo] = useState(null);

  // Example data (to be fetched dynamically)
  const trendingHighlights = [
    {
      id: 1,
      title: "Aaron Judge's Home Run Blast",
      video: "https://example.com/video1.mp4",
      icon: <FaBaseballBall className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Mookie Betts' Game-Winning Catch",
      video: "https://example.com/video2.mp4",
      icon: <FaTrophy className="text-yellow-500" />,
    },
  ];

  const favoriteTeams = [
    { name: "Yankees", description: "Legendary New York powerhouse" },
    { name: "Dodgers", description: "West Coast baseball royalty" }
  ];

  const favoritePlayers = [
    { 
      name: "Aaron Judge", 
      description: "Yankees' home run king",
      stats: { homeRuns: 62, battingAverage: 0.311 }
    },
    { 
      name: "Mookie Betts", 
      description: "Dodgers' all-star performer",
      stats: { homeRuns: 35, battingAverage: 0.269 }
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section with Dynamic Animation */}
      <animated.div 
        style={heroAnimation} 
        className="text-center py-16 px-4 relative container mx-auto max-w-6xl"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10 opacity-50"></div>
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Baseball Highlights Platform
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Your ultimate destination for personalized baseball insights, real-time highlights, 
          and in-depth player analytics.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center">
            <FaPlayCircle className="mr-2" /> Watch Highlights
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center">
            <FaChartLine className="mr-2" /> Player Stats
          </button>
        </div>
      </animated.div>

      {/* Trending Highlights */}
      <animated.div style={sectionTrail[0]} className="px-6 py-10 container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
            <FaPlayCircle className="mr-4 text-blue-500" /> Trending Highlights
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {trendingHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-gray-900 p-4 rounded-lg hover:shadow-2xl transition duration-300 group w-full max-w-xs"
                onMouseEnter={() => setActiveVideo(highlight.id)}
                onMouseLeave={() => setActiveVideo(null)}
              >
                <div className="relative mb-4">
                  <video
                    src={highlight.video}
                    controls={activeVideo === highlight.id}
                    className={`rounded-md w-full 
                      ${activeVideo === highlight.id 
                        ? 'opacity-100 scale-105' 
                        : 'opacity-70 scale-100'
                      } transition-all duration-300`}
                    alt={highlight.title}
                  />
                  {activeVideo !== highlight.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {highlight.icon}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors text-center">
                  {highlight.title}
                </h3>
              </div>
            ))}
          </div>
        </animated.div>

      {/* Favorite Teams and Players Sections */}
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 px-6 py-10">
        {/* Favorite Teams */}
        <animated.div style={sectionTrail[1]} className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Your Favorite Teams</h2>
          <div className="space-y-4">
            {favoriteTeams.map((team, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 group text-center"
              >
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {team.name}
                </h3>
                <p className="text-gray-400 mt-2">{team.description}</p>
              </div>
            ))}
          </div>
        </animated.div>

        {/* Favorite Players */}
        <animated.div style={sectionTrail[2]} className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Your Favorite Players</h2>
          <div className="space-y-4">
            {favoritePlayers.map((player, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 group text-center"
              >
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {player.name}
                </h3>
                <p className="text-gray-400 mt-2">{player.description}</p>
                <div className="mt-4 flex justify-center space-x-4 text-sm">
                  <span>Home Runs: <strong>{player.stats.homeRuns}</strong></span>
                  <span>Batting Avg: <strong>{player.stats.battingAverage}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </animated.div>
      </div>

      {/* Call-to-Action Section */}
      <animated.div style={sectionTrail[3]} className="text-center py-16 bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Dive Deeper?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Unlock personalized insights, real-time updates, and comprehensive baseball analytics.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-xl font-semibold transition-all duration-300 flex items-center mx-auto">
            <FaChartLine className="mr-4" /> Explore Full Platform
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default Home;