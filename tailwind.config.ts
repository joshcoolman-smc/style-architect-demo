import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				// Structural fonts (Navigation, headings, UI controls)
				'structural': ['var(--font-structural)', 'ui-sans-serif', 'system-ui'],
				// Content fonts (Body copy, descriptions, articles) 
				'content': ['var(--font-content)', 'ui-sans-serif', 'system-ui'],
				// Sub-headers
				'subheader': ['var(--font-subheader)', 'ui-serif', 'serif'],
				// Technical monospace - properly configured IBM Plex Mono
				'technical': ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
				// Monospace
				'mono': ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
				
				// Available font options - properly configured
				'montserrat': ['Montserrat', 'ui-sans-serif', 'system-ui'],
				'lora': ['Lora', 'ui-serif', 'serif'],
				'hind': ['Hind Madurai', 'ui-sans-serif', 'system-ui'],
				'inter': ['Inter', 'ui-sans-serif', 'system-ui'],
				'poppins': ['Poppins', 'ui-sans-serif', 'system-ui'],
				'roboto': ['Roboto', 'ui-sans-serif', 'system-ui'],
				'open-sans': ['Open Sans', 'ui-sans-serif', 'system-ui'],
				'playfair': ['Playfair Display', 'ui-serif', 'serif'],
				'ibm-plex-mono': ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
				'martel': ['Martel', 'ui-serif', 'serif'],
				'cardo': ['Cardo', 'ui-serif', 'serif'],
				'muli': ['Muli', 'ui-sans-serif', 'system-ui'],
				'source-sans-pro': ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
				'roboto-slab': ['Roboto Slab', 'ui-serif', 'serif'],
			},
			colors: {
				// Dark mode color palette
				brand: {
					50: '#0f1419',
					100: '#1a202c',
					200: '#2d3748',
					300: '#4a5568',
					400: '#718096',
					500: '#a0aec0',
					600: '#cbd5e0',
					700: '#e2e8f0',
					800: '#edf2f7',
					900: '#f7fafc',
					950: '#ffffff',
				},
				accent: {
					50: '#0d1117',
					100: '#161b22',
					200: '#21262d',
					300: '#30363d',
					400: '#484f58',
					500: '#6e7681',
					600: '#8b949e',
					700: '#b1bac4',
					800: '#c9d1d9',
					900: '#e6edf3',
					950: '#f0f6fc',
				},
				neutral: {
					50: '#0a0a0a',
					100: '#171717',
					200: '#262626',
					300: '#404040',
					400: '#525252',
					500: '#737373',
					600: '#a3a3a3',
					700: '#d4d4d4',
					800: '#e5e5e5',
					900: '#f5f5f5',
					950: '#fafafa',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontSize: {
				// Dynamic type scale using CSS custom properties
				// text-caption
				caption: [
					"var(--font-size-caption, 12px)",
					{
						lineHeight: "16px",
						fontWeight: "400",
					},
				],

				// text-caption-bold
				"caption-bold": [
					"var(--font-size-caption, 12px)",
					{
						lineHeight: "16px",
						fontWeight: "500",
					},
				],

				// text-body
				body: [
					"var(--font-size-body, 14px)",
					{
						lineHeight: "20px",
						fontWeight: "400",
					},
				],

				// text-body-bold
				"body-bold": [
					"var(--font-size-body, 14px)",
					{
						lineHeight: "20px",
						fontWeight: "500",
					},
				],

				// text-heading-3
				"heading-3": [
					"var(--font-size-heading-3, 16px)",
					{
						lineHeight: "20px",
						fontWeight: "600",
					},
				],

				// text-heading-2
				"heading-2": [
					"var(--font-size-heading-2, 20px)",
					{
						lineHeight: "24px",
						fontWeight: "600",
					},
				],

				// text-heading-1
				"heading-1": [
					"var(--font-size-heading-1, 30px)",
					{
						lineHeight: "36px",
						fontWeight: "500",
					},
				],

				// text-monospace-body
				"monospace-body": [
					"var(--font-size-body, 14px)",
					{
						lineHeight: "20px",
						fontWeight: "400",
					},
				],

				// Keep existing display sizes for special cases
				'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
				'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
				'display-xs': ['1.5rem', { lineHeight: '1.3' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				// Mathematical spacing system (8px base)
				'unit': '0.5rem', // 8px base unit
				'3unit': '1.5rem', // 24px
				'4unit': '2rem', // 32px
				'6unit': '3rem', // 48px
				'8unit': '4rem', // 64px
				'10unit': '5rem', // 80px
				'12unit': '6rem', // 96px
				'16unit': '8rem', // 128px
				'20unit': '10rem', // 160px
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
