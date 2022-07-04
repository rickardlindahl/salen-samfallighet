module.exports = {
  content: ["app/**/*.tsx", "node_modules/react-daisyui/dist/react-daisyui.cjs", "node_modules/daisyui/dist/**/*"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
