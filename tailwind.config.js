/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
       sidebarBg:'#F0F4F4',
        primary:'#247B7B',
       sidebarText:'#455454'
      }
    },
  },
  plugins: [],
}

