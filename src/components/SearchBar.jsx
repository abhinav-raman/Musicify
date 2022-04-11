const SearchBar = ({ onSearch }) => {
	return (
		<div className="w-full flex justify-center">
			<input
				placeholder="Search with author or album name"
				onChange={onSearch}
				className="w-9/12 h-12 p-3 border-2 outline-none focus:border-green-500 rounded-full flex text-center justify-center bg-search-icon bg-contain bg-origin-content bg-left bg-no-repeat"
			/>
		</div>
	);
};

export default SearchBar;
