import aspectRatio from '@tailwindcss/aspect-ratio';

// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        indigo: {
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
    },
  },
  plugins: [
    aspectRatio, // 이미지 비율 유지용
  ],
}