/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic brand colors using CSS custom properties
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
          'primary-hover': 'var(--brand-primary-hover)',
          'secondary-hover': 'var(--brand-secondary-hover)',
          'accent-hover': 'var(--brand-accent-hover)',
          'primary-text': 'var(--brand-primary-text)',
          'secondary-text': 'var(--brand-secondary-text)',
          'accent-text': 'var(--brand-accent-text)',
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
    },
    // Include arbitrary shadow values for magic effects
    {
      pattern: /shadow-\[0_0_\d+px_rgba\(\d+,\d+,\d+,[\d.]+\)\]/,
    },
    {
      pattern: /hover:shadow-\[0_0_\d+px_rgba\(\d+,\d+,\d+,[\d.]+\)\]/,
    },
    // Magic button classes
    'animate-pulse',
    'animate-bounce',
    'hover:scale-105',
    'transition-all',
    'duration-300',
    'duration-500',
    'magic-glow-purple',
    'magic-glow-indigo',
    'magic-glow-rainbow'
  ]
}
