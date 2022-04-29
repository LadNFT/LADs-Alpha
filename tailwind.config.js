module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: 'class', 
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "scale-in":{
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "scale(0%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "scale(100%)",
          },
        }
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
      },
      container:{
        center:true,
        padding:{
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        }
      },
      colors:{
        primary:'rgb(150, 32, 107)',
        secondary:'rgb(13, 63, 148)',
        third:'#152139',
      }
    },
  }
};

