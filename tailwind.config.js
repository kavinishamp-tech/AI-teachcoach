/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          // Warm Linen & Beige Surfaces
          bg: '#FAF8F5',
          card: '#FFFFFF',
          cardMuted: '#F5EFEB',
          border: '#EAE3D9',
          borderDark: '#D8CEBE',
          
          // Pastel Sage / Mint Green
          sageLight: '#EDF6F0',
          sageSoft: '#D3E8DC',
          sage: '#6EA685',
          sageDark: '#38664D',
          
          // Soft Blush / Dusty Pink
          pinkLight: '#FDF2F4',
          pinkSoft: '#F8D7DA',
          pink: '#E07A8B',
          pinkDark: '#B84E62',
          
          // Warm Peach / Amber
          peachLight: '#FEF3EB',
          peachSoft: '#FBD7BE',
          peach: '#D98248',
          peachDark: '#A65522',
          
          // Typography / Cocoa Charcoal
          ink: '#2D2824',
          inkMuted: '#6E645D',
          inkSubtle: '#9C9289',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(45, 40, 36, 0.05)',
        'soft-md': '0 4px 20px -3px rgba(45, 40, 36, 0.08)',
        'soft-lg': '0 10px 30px -5px rgba(45, 40, 36, 0.10)',
        'sage': '0 4px 15px -3px rgba(110, 166, 133, 0.25)',
        'pink': '0 4px 15px -3px rgba(224, 122, 139, 0.25)',
      },
    },
  },
  plugins: [],
}
