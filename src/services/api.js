export async function getRevenueData() {
	return [
		{ date: "2024-01", revenue: 10000 },
		{ date: "2024-02", revenue: 15000 },
		{ date: "2024-03", revenue: 12000 },
		{ date: "2024-04", revenue: 18000 },
	];
}

export async function getProducts() {
	return [
		{ id: 1, name: "iPhone 14", stock: 4, price: 999 },
		{ id: 2, name: "Samsung TV", stock: 12, price: 499 },
		{ id: 3, name: "PS5", stock: 2, price: 599 },
	];
}

export async function addProduct(product) {
	console.log("Product added:", product);
	return true;
}
