/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#090e18",
        surface: {
          DEFAULT: "#0e1322",
          container: {
            lowest: "#060a12",
            low: "#0f1621",
            DEFAULT: "#151f2b",
            high: "#1c2633",
            highest: "#2c3e50"
          },
          dim: "#090e18",
          bright: "#253141",
          variant: "#253141",
        },
        primary: {
          DEFAULT: "#b3c9e2",
          container: "#34495e",
          fixed: {
            DEFAULT: "#d7e2ff",
            dim: "#b3c9e2"
          }
        },
        secondary: {
          DEFAULT: "#9babce",
          container: "#152641",
          fixed: {
            DEFAULT: "#e9ddff",
            dim: "#9babce"
          }
        },
        tertiary: {
          DEFAULT: "#25e0a7",
          fixed: {
            DEFAULT: "#53fec2",
            dim: "#25e0a7"
          }
        },
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a"
        },
        outline: {
          DEFAULT: "#6c7a8f",
          variant: "#3e4759"
        },
        gunmetal: {
          950: "#090e18",
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          light: "#34495e",
          dark: "#1a252f",
          DEFAULT: "#2C3E50"
        }
      },
      fontFamily: {
        headline: ["Inter-Medium", "sans-serif"],
        body: ["Inter-Regular", "sans-serif"],
        label: ["Inter-Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}
