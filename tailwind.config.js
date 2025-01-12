/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html", // Include your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the src directory
  ],

  theme: {
    extend: {
      scale: {
        102: "1.1",
      },
    },
  },

  plugins: [],
};
