module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#344FA3",
        darkBlue: "#021954",
        darkBlueHover: "#03216d",
        pink: "#F000F0",
        fontAlt: "#9BB3FB",
        progress: "#9FADB4",
      },
      height: {
        "2px": "2px",
        "86p": "86%",
      },
      width: {
        "2px": "2px",
      },
      spacing: {
        1.25: "3px",
        2.4: "9px",
      },
      boxShadow: {
        custom: "0px -5px 15px 0px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
}
