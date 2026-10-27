/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F5',
        canvas: '#F8F6F5',
        brand: {
          50: '#FDF2F2',
          100: '#FDE8E8',
          200: '#FBD5D5',
          500: '#D1343A',
          600: '#BA262C',
          700: '#A81818',
          800: '#8A1414',
          900: '#680E0E',
          DEFAULT: '#D1343A',
          deep: '#A81818',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F3F0EE',
          muted: '#EBE7E4',
          card: '#FFFFFF',
        },
        ink: {
          heading: '#0B0F19',
          body: '#1E293B',
          primary: '#0B0F19',
          secondary: '#1E293B',
          meta: '#64748B',
          muted: '#64748B',
        },
        border: {
          subtle: '#E2E4DC',
          DEFAULT: '#E2E4DC',
        },
        accent: {
          emerald: '#16A34A',
          amber: '#D97706',
          lime: '#C8F169',
        },
        status: {
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
        },
      },
      borderRadius: {
        card: '12px',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Roboto Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        display: [
          'Inter',
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(11, 15, 25, 0.04), 0 1px 2px 0 rgba(11, 15, 25, 0.02)',
        card: '0 2px 8px -1px rgba(11, 15, 25, 0.06), 0 1px 4px -1px rgba(11, 15, 25, 0.04)',
        elevated: '0 12px 32px -4px rgba(11, 15, 25, 0.08), 0 4px 12px -2px rgba(11, 15, 25, 0.04)',
      },
    },
  },
  plugins: [],
};

