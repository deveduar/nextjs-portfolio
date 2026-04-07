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
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-alt": "rgb(var(--color-backgroundAlt) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surfaceAlt) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surfaceMuted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "border-strong": "rgb(var(--color-borderStrong) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-mutedForeground) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-alt": "rgb(var(--color-accentAlt) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accentHover) / <alpha-value>)",
        "accent-foreground": "rgb(var(--color-accentForeground) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        overlay: "rgb(var(--color-overlay) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        theme: "0 20px 40px rgb(var(--color-shadow) / 0.18)",
        soft: "0 10px 30px rgb(var(--color-shadow) / 0.12)",
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
        imageReveal: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
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
        },
        sidebarSlideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        sidebarSlideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' }
        },
        overlayFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        overlayFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        slideRight: 'slideRight 0.5s ease-out',
        slideLeft: 'slideLeft 0.5s ease-out',
        zoomIn: 'zoomIn 0.5s ease-out',
        imageReveal: 'imageReveal 0.4s ease-out forwards',
        
        modalSlideOutLeft: 'modalSlideOutLeft 0.4s ease-in-out',
        modalSlideOutRight: 'modalSlideOutRight 0.4s ease-in-out',
        modalSlideInLeft: 'modalSlideInLeft 0.4s ease-in-out',
        modalSlideInRight: 'modalSlideInRight 0.4s ease-in-out',
        menuSlideDown: 'menuSlideDown 0.3s ease-in-out',

        sidebarSlideIn: 'sidebarSlideIn 0.3s ease-out',
        sidebarSlideOut: 'sidebarSlideOut 0.3s ease-in',
        overlayFadeIn: 'overlayFadeIn 0.2s ease-out',
        overlayFadeOut: 'overlayFadeOut 0.2s ease-in'

      }
    },
  },
  plugins: [],
};

export default config;
