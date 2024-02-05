/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			spacing: {
				'26': '6.7rem', // Add custom spacing for width and height
			},
			colors: {
				'primary': '#f26444',
				'secondary': '#56423d',
				'tertiary': '#bea6a0',
				'quaternary': '#00a8f5',
				'quinary': '#0074bc',

				'main': '#352b29'
			},
			fontFamily: {
				'pretendard': [ 'Pretendard Variable', 'sans-serif' ],
				'sans': [ 'Pretendard Variable', 'sans-serif' ],
				'nps': [ '국민연금체', 'sans-serif' ]
			},
			translate: {
				'100%': '100%',
				'200%': '200%'
			},
			keyframes: {
				'left-0-100': {
					'0%': 'translate-x-0',
					'100%': '-translate-x-100%'
				},
				'left-100-200': {
					'0%': '-translate-x-100%',
					'100%': '-translate-x-200%'
				},
				'right-200-100': {
					'0%': '-translate-x-200%',
					'100%': '-translate-x-100%'
				},
				'right-100-0': {
					'0%': '-translate-x-100%',
					'100%': 'translate-x-0'
				}
			}
		}
	},
	plugins: [],
}
