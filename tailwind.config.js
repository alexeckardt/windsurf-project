/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic brand colors will be injected here
        brand: {
          primary: '#3B82F6',
          secondary: '#64748B',
          accent: '#F59E0B',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          neutral: '#6B7280'
        }
      },
      fontFamily: {
        // Dynamic brand fonts will be injected here
        brand: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        // Dynamic brand border radius
        brand: '0.5rem'
      },
      spacing: {
        // Dynamic brand spacing
        brand: '1rem'
      }
    },
  },
  plugins: [],
  safelist: [
    // Ensure all possible brand color combinations are included
    {
      pattern: /bg-(brand|red|blue|green|yellow|purple|pink|indigo|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(brand|red|blue|green|yellow|purple|pink|indigo|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(brand|red|blue|green|yellow|purple|pink|indigo|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Include arbitrary color values for dynamic brand colors
    {
      pattern: /bg-\[#[0-9a-fA-F]{6}\]/,
    },
    {
      pattern: /text-\[#[0-9a-fA-F]{6}\]/,
    },
    {
      pattern: /border-\[#[0-9a-fA-F]{6}\]/,
    },
    {
      pattern: /hover:bg-\[#[0-9a-fA-F]{6}\]/,
    },
    {
      pattern: /focus:ring-\[#[0-9a-fA-F]{6}\]/,
    }
  ]
}
