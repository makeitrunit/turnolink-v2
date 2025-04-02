/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",  // Esto es crucial para que Tailwind detecte las clases
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}