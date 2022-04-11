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
				"card-custom": "0 15px 30px #ccc",
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
		}
	},
  darkMode: 'dark-theme',
	plugins: [],
};
