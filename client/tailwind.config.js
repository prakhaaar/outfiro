// client/tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "43px": "43px",
        "55px": "55px",
      },
      colors: {
        secondary: "#64748b",
        tertiary: "#abc123", // Add the tertiary color if needed
        primary: "#007bff", // Add the primary color here
        gray: {
          30: "#e6e6e6", // Light custom gray color
        },
      },
    },
  },
  plugins: [],
};
