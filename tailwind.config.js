module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"search-icon": "url('./assets/images/search-icon.svg)",
				"like-icon": "url('./assets/images/like-icon.svg')",
				"close-icon": "url('./assets/images/close-icon.svg'')",
			},
			rotate: {
				360: "360deg",
			},
			boxShadow: {
				"card-custom-light": "0 15px 30px #aaa",
				"card-custom-dark": "0 15px 30px #222222",
			},
		},
		fontFamily: {
			custom: [
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Oxygen",
				"Ubuntu",
				"Cantarell",
				"Open Sans",
				"Helvetica Neue",
				"sans-serif",
			],
		},
    color: {
      'white': '#ffffff'
    }
	},
  darkMode: 'dark-theme',
	plugins: [],
};
