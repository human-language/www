/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['Georgia', 'Cambria', 'serif'], // Use system serif fonts
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Keep custom gray colors
        customGray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.customGray.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            code: {
              color: theme('colors.primary.900'),
              backgroundColor: theme('colors.customGray.100'),
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.customGray.900'),
              color: theme('colors.customGray.100'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.customGray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.customGray.800'),
            },
            pre: {
              backgroundColor: theme('colors.customGray.950'),
              color: theme('colors.customGray.100'),
            },
            h1: {
              color: theme('colors.customGray.100'),
            },
            h2: {
              color: theme('colors.customGray.100'),
            },
            h3: {
              color: theme('colors.customGray.100'),
            },
            h4: {
              color: theme('colors.customGray.100'),
            },
            strong: {
              color: theme('colors.customGray.100'),
            },
            blockquote: {
              color: theme('colors.customGray.400'),
              borderLeftColor: theme('colors.customGray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
}

