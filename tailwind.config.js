/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
        mono: ["Space Mono", 'monospace']
      },
      colors: {
        dark: 'rgb(31, 31, 31)',
        light: '#f5f5f5',
        primary: '#B63E96',
        primaryDark: '#58E6D9',
        bull: 'rgb(4, 188, 102)',
        cow: 'rgb(222, 222, 0)',
        default: 'rgb(90, 83, 83)',
        keyCap: 'rgb(204, 188, 188)',
        lightBlue: 'rgb(147 197 253)'
      },
      gridTemplateColumns: {
        '5': 'repeat(5, 46px)'
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }
    
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
    
        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
    
        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }
    
        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
    
        xs: { max: "479px" },
        // => @media (max-width: 479px) { ... }
    },
    },
  },
  plugins: [],
}