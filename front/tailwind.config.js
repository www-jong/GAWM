/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
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
			}
		}
	},
	plugins: [],
}
