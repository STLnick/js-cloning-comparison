module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        svelte: {
          100: "#ffc5b3",
          200: "#ff9f80",
          300: "#ff8b66",
          400: "#ff6533",
          500: "#FF3E00",
          600: "#cc3200",
          700: "#992500",
          800: "#801f00",
          900: "#4c1300",
        },
      },
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
