/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./constants.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'ipc-bg': '#e8ebf2',
        'ipc-accent': '#4a69bd',
        'ipc-success': '#00b894',
        'ipc-danger': '#d63031',
        'ipc-warning': '#f1c40f',
      },
    },
  },
  plugins: [],
}
