/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12161C",
        surface: "#FFFFFF",
        canvas: "#F6F7F9",
        border: "#E4E7EC",
        muted: "#6B7280",
        brand: {
          50: "#EEF4FF",
          100: "#D9E5FF",
          400: "#5B7FFF",
          500: "#3E63FF",
          600: "#2F4EE0",
          700: "#243CB3",
        },
        accent: {
          teal: "#0FA3A3",
          amber: "#E1A83A",
          coral: "#E1614B",
          violet: "#7C6CE0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Lexend", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
        pop: "0 4px 12px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
