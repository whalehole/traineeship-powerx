module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'big-1': '400px',
        'big-2': '800px',
        'big-3': '1200px',
        'big-4': '1500px',
      },
      minWidth: {
        'big-1': '1900px',
        'big-2': '2500px',
      },
      gridAutoRows: {
        '1': '20px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
