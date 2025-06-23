// // import daisyui from "daisyui";

// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [daisyui],
// //   daisyui: {
// //     themes: [
// //       "light",
// //       "dark",
// //       "cupcake",
// //       "bumblebee",
// //       "emerald",
// //       "corporate",
// //       "synthwave",
// //       "retro",
// //       "cyberpunk",
// //       "valentine",
// //       "halloween",
// //       "garden",
// //       "forest",
// //       "aqua",
// //       "lofi",
// //       "pastel",
// //       "fantasy",
// //       "wireframe",
// //       "black",
// //       "luxury",
// //       "dracula",
// //       "cmyk",
// //       "autumn",
// //       "business",
// //       "acid",
// //       "lemonade",
// //       "night",
// //       "coffee",
// //       "winter",
// //       "dim",
// //       "nord",
// //       "sunset",
// //     ],
// //   },
// // };
// import daisyui from "daisyui";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui], // Use the imported module
//   daisyui: {
//     themes: [
//       "light",
//       "dark",
//       "cupcake",
//       "bumblebee",
//       "emerald",
//       "corporate",
//       "synthwave",
//       "retro",
//       "cyberpunk",
//       "valentine",
//       "halloween",
//       "garden",
//       "forest",
//       "aqua",
//       "lofi",
//       "pastel",
//       "fantasy",
//       "wireframe",
//       "black",
//       "luxury",
//       "dracula",
//       "cmyk",
//       "autumn",
//       "business",
//       "acid",
//       "lemonade",
//       "night",
//       "coffee",
//       "winter",
//       "dim",
//       "nord",
//       "sunset",
//     ],
//     darkTheme: "dark",
//   },
// };
// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
};