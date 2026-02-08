/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      width: {
        '200': '200px',
      },
      height: {
        '200': '200px',
      },
      spacing: {
        '200': '12.5rem'
      },
    },
  },
  plugins: [
  ],
}

