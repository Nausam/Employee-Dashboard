/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        textShadow: {
          default: "0 2px 5px rgba(0, 0, 0, 0.5)",
          // you can add more custom text shadows here
        },
      },
      colors: {
        "primary-orange": "#FF5722",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["hover", "focus"],
      borderWidth: ["hover", "focus"],
      textShadow: ["responsive"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-strong": {
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)", // stronger shadow
        },
        ".text-shadow-light": {
          textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)", // lighter shadow
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
