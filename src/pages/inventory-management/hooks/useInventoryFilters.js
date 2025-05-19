import { useState, useEffect } from "react";

export default function useInventoryFilters(products) {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [platformFilter, setPlatformFilter] = useState("all");
	const [stockFilter, setStockFilter] = useState("all");
	const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);

	const allCategories = [...new Set(products.map(product => product.category))];
	const allPlatforms = [...new Set(products.map(product => product.platform))];

	useEffect(() => {
		applyFilters();
		setCurrentPage(1);
	}, [searchTerm, categoryFilter, platformFilter, stockFilter, sortConfig, products]);

	const applyFilters = () => {
		let result = [...products];

		if (searchTerm) {
			result = result.filter(
				product =>
					product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (categoryFilter !== "all") {
			result = result.filter(product => product.category === categoryFilter);
		}

		if (platformFilter !== "all") {
			result = result.filter(product => product.platform === platformFilter);
		}

		if (stockFilter === "low") {
			result = result.filter(product => product.stock < product.threshold);
		} else if (stockFilter === "out") {
			result = result.filter(product => product.stock === 0);
		}

		if (sortConfig.key) {
			result.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}

		setFilteredProducts(result);
	};

	const handleSort = key => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

	return {
		filteredProducts,
		currentItems,
		totalItems: filteredProducts.length,
		currentPage,
		totalPages,
		paginate,
		nextPage,
		prevPage,
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
		platformFilter,
		setPlatformFilter,
		stockFilter,
		setStockFilter,
		sortConfig,
		handleSort,
		allCategories,
		allPlatforms,
	};
}
