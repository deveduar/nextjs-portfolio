import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Habilitar modo oscuro basado en clases
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        // fadeIn: {
        //   '0%': { opacity: '0', transform: 'scale(0.95)' },
        //   '100%': { opacity: '1', transform: 'scale(1)' }
        // },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },

        modalSlideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1', visibility: 'visible' },
          '99%': { transform: 'translateX(-100%)', opacity: '0', visibility: 'visible' },
          '100%': { transform: 'translateX(-100%)', opacity: '0', visibility: 'hidden' }
        },
        modalSlideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1', visibility: 'visible' },
          '99%': { transform: 'translateX(100%)', opacity: '0', visibility: 'visible' },
          '100%': { transform: 'translateX(100%)', opacity: '0', visibility: 'hidden' }
        },
        modalSlideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0', visibility: 'visible' },
          '1%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        modalSlideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0', visibility: 'visible' },
          '1%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        menuSlideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        slideRight: 'slideRight 0.5s ease-out',
        slideLeft: 'slideLeft 0.5s ease-out',
        zoomIn: 'zoomIn 0.5s ease-out',
        
        modalSlideOutLeft: 'modalSlideOutLeft 0.4s ease-in-out',
        modalSlideOutRight: 'modalSlideOutRight 0.4s ease-in-out',
        modalSlideInLeft: 'modalSlideInLeft 0.4s ease-in-out',
        modalSlideInRight: 'modalSlideInRight 0.4s ease-in-out',
        menuSlideDown: 'menuSlideDown 0.3s ease-in-out',

      }
    },
  },
  plugins: [],
};

export default config;
