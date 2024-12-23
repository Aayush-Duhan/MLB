/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables toggling dark mode using a class
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Pure black background
        secondary: '#111111', // Slightly lighter black for secondary elements
        accent: '#bb86fc', // Bright color for accent elements (can be any bright color you want)
        textPrimary: '#ffffff', // Pure white text color
        textSecondary: '#bbbbbb', // Lighter white for less important text
        cardBackground: '#222222', // Dark card background
        buttonBackground: '#333333', // Dark button background
        buttonHover: '#444444', // Darker hover button background
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
