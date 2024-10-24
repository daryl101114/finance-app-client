/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
    darkMode: ["class"],
	content: [
		    './pages/**/*.{ts,tsx}',
		    './components/**/*.{ts,tsx}',
		    './app/**/*.{ts,tsx}',
		    './src/**/*.{ts,tsx}',
		    './index.html',  // Include Storybook files as well
		  ],
  theme: {
	container: {
		center: true,
	},
  	colors: {
  		transparent: 'transparent',
  		background: '#BCCCDC',
		green:colors.green,
		indigo: colors.indigo,
		emerald: colors.emerald,
		black: colors.black,
		yellow: colors.yellow
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			neutral: {
				'50': '#F0F4F8',
				'100': '#D9E2EC',
				'200': '#BCCCDC',
				'300': '#9FB3C8',
				'400': '#829AB1',
				'500': '#627D98',
				'600': '#486581',
				'700': '#334E68',
				'800': '#243B53',
				'900': '#102A43'
			},
			cyan: {
				'50': '#E0FCFF',
				'100': '#BEF8FD',
				'200': '#87EAF2',
				'300': '#54D1DB',
				'400': '#38BEC9',
				'500': '#2CB1BC',
				'600': '#14919B',
				'700': '#0E7C86',
				'800': '#0A6C74',
				'900': '#044E54'
			},
			red: {
				'50': '#FFEEEE',
				'100': '#FACDCD',
				'200': '#F29B9B',
				'300': '#E66A6A',
				'400': '#D64545',
				'500': '#BA2525',
				'600': '#A61B1B',
				'700': '#911111',
				'800': '#780A0A',
				'900': '#610404'
			},
			yellow: {
				'50': '#FFFBEA',
				'100': '#FFF3C4',
				'200': '#FCE588',
				'300': '#FADB5F',
				'400': '#F7C948',
				'500': '#F0B429',
				'600': '#DE911D',
				'700': '#CB6E17',
				'800': '#B44D12',
				'900': '#8D2B0B'
			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
				'50': '#DCEEFB',
				'100': '#B6E0FE',
				'200': '#84C5F4',
				'300': '#62B0E8',
				'400': '#4098D7',
				'500': '#2680C2',
				'600': '#186FAF',
				'700': '#0F609B',
				'800': '#0A558C',
				'900': '#003E6B'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

