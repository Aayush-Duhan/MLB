import React, { useState } from "react";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { 
  FaPlayCircle, 
  FaTrophy, 
  FaBaseballBall, 
  FaChartLine, 
  FaStar 
} from "react-icons/fa";

const Highlights = () => {
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

  // Interactive state for video previews
  const [activeVideo, setActiveVideo] = useState(null);

  // Mock data with enhanced details
  const trendingHighlights = [
    { 
      id: 1, 
      title: "Grand Slam by Shohei Ohtani", 
      video: "https://example.com/video1.mp4",
      description: "Ohtani crushes a massive grand slam in crucial game moment",
      icon: <FaBaseballBall className="text-blue-500" />,
      team: "Los Angeles Angels"
    },
    { 
      id: 2, 
      title: "Amazing Catch by Mike Trout", 
      video: "https://example.com/video2.mp4",
      description: "Trout makes an incredible diving catch at the warning track",
      icon: <FaTrophy className="text-yellow-500" />,
      team: "Los Angeles Angels"
    },
    { 
      id: 3, 
      title: "Walk-Off Home Run", 
      video: "https://example.com/video3.mp4",
      description: "Dramatic walk-off home run in extra innings",
      icon: <FaStar className="text-red-500" />,
      team: "Unknown"
    }
  ];

  const personalizedHighlights = [
    { 
      id: 4, 
      title: "Judge's Record-Breaking Home Run", 
      video: "https://example.com/video4.mp4",
      description: "Aaron Judge breaks home run record with stunning hit",
      icon: <FaChartLine className="text-green-500" />,
      team: "New York Yankees"
    },
    { 
      id: 5, 
      title: "Mookie Betts Stealing the Show", 
      video: "https://example.com/video5.mp4",
      description: "Betts makes an incredible play that turns the game around",
      icon: <FaStar className="text-purple-500" />,
      team: "Los Angeles Dodgers"
    }
  ];

  const renderHighlightCard = (highlight, trail) => (
    <animated.div 
      style={trail}
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
      <div className="text-center">
        <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
          {highlight.title}
        </h3>
        <p className="text-sm text-gray-400 mt-2">{highlight.description}</p>
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
          <span className="mr-2">🏆</span>
          {highlight.team}
        </div>
      </div>
    </animated.div>
  );

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <animated.div 
        style={heroAnimation} 
        className="text-center py-16 px-4 relative container mx-auto max-w-6xl"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10 opacity-50"></div>
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Game Highlights
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Relive the most electrifying moments from across the baseball world
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center">
            <FaPlayCircle className="mr-2" /> Watch Now
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center">
            <FaChartLine className="mr-2" /> Top Plays
          </button>
        </div>
      </animated.div>

      {/* Trending Highlights Section */}
      <animated.div style={sectionTrail[0]} className="px-6 py-10 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <FaPlayCircle className="mr-4 text-blue-500" /> Trending Highlights
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {trendingHighlights.map((highlight) => renderHighlightCard(highlight))}
        </div>
      </animated.div>

      {/* Personalized Highlights Section */}
      <animated.div style={sectionTrail[1]} className="px-6 py-10 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <FaStar className="mr-4 text-yellow-500" /> Your Personalized Highlights
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {personalizedHighlights.map((highlight) => renderHighlightCard(highlight))}
        </div>
      </animated.div>

      {/* Load More Section */}
      <animated.div style={sectionTrail[2]} className="text-center py-16 bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-6">More Exciting Moments Await</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover endless baseball excitement with our comprehensive highlight collection
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-xl font-semibold transition-all duration-300 flex items-center mx-auto hover:scale-105">
            <FaPlayCircle className="mr-4" /> Load More Highlights
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default Highlights;