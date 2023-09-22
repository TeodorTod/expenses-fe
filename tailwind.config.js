/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      borderColor: {
        'custom-blue': '#3B71CA',
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
}

