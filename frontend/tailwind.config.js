/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'delivery-image': "url('/src/assets/delivery-image.jpg')",
        'dash-delivery-logo': "url('/src/assets/dash-delivery-logo.png')"
       }
    },
  },
  plugins: [],
}

