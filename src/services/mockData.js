// services/mockData.js - Mock data for the application

// Generate sample products
const generateProducts = () => {
	const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Books"];
	const platforms = ["Amazon", "Walmart"];

	const products = [];

	for (let i = 1; i <= 50; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)];
		const platform = platforms[Math.floor(Math.random() * platforms.length)];
		const price = parseFloat((Math.random() * 200 + 10).toFixed(2));
		const stock = Math.floor(Math.random() * 100);

		products.push({
			id: i,
			name: `Product ${i}`,
			description: `This is a sample description for product ${i}`,
			category,
			price,
			stock,
			threshold: 10,
			platform,
			image: `/api/placeholder/300/300`,
		});
	}

	return products;
};

// Generate orders based on products
const generateOrders = products => {
	const orders = [];
	const startDate = new Date("2025-01-01");
	const endDate = new Date("2025-05-14"); // Current date for demo

	for (let i = 1; i <= 200; i++) {
		const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
		const itemCount = Math.floor(Math.random() * 5) + 1;
		const items = [];
		let totalAmount = 0;

		for (let j = 0; j < itemCount; j++) {
			const product = products[Math.floor(Math.random() * products.length)];
			const quantity = Math.floor(Math.random() * 3) + 1;
			const amount = parseFloat((product.price * quantity).toFixed(2));

			items.push({
				productId: product.id,
				productName: product.name,
				quantity,
				unitPrice: product.price,
				amount,
				category: product.category,
				platform: product.platform,
			});

			totalAmount += amount;
		}

		orders.push({
			id: i,
			orderDate: date,
			items,
			totalAmount: parseFloat(totalAmount.toFixed(2)),
			customer: `Customer ${Math.floor(Math.random() * 100) + 1}`,
			status: Math.random() > 0.1 ? "Completed" : "Processing",
		});
	}

	return orders.sort((a, b) => a.orderDate - b.orderDate);
};

// Initialize data
const products = generateProducts();
const orders = generateOrders(products);

// Calculate daily, weekly, monthly and annual sales data
const calculateSalesData = orders => {
	// Daily sales for the last 30 days
	const dailySales = [];
	const dailyOrders = [];

	const last30Days = new Date();
	last30Days.setDate(last30Days.getDate() - 30);

	for (let i = 0; i < 30; i++) {
		const date = new Date(last30Days);
		date.setDate(date.getDate() + i);
		const dateStr = date.toISOString().split("T")[0];

		const dayOrders = orders.filter(order => order.orderDate.toISOString().split("T")[0] === dateStr);

		const daySales = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);

		dailySales.push({
			date: dateStr,
			value: parseFloat(daySales.toFixed(2)),
		});

		dailyOrders.push({
			date: dateStr,
			value: dayOrders.length,
		});
	}

	// Monthly sales for the current year
	const monthlySales = [];
	const monthlyOrders = [];

	const currentYear = new Date().getFullYear();

	for (let month = 0; month < 5; month++) {
		// Only 5 months in 2025 so far
		const monthOrders = orders.filter(order => {
			const orderDate = order.orderDate;
			return orderDate.getFullYear() === currentYear && orderDate.getMonth() === month;
		});

		const monthSales = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

		monthlySales.push({
			month: new Date(currentYear, month, 1).toLocaleString("default", { month: "short" }),
			value: parseFloat(monthSales.toFixed(2)),
		});

		monthlyOrders.push({
			month: new Date(currentYear, month, 1).toLocaleString("default", { month: "short" }),
			value: monthOrders.length,
		});
	}

	// Calculate sales by category
	const categorySales = {};
	const categoryOrders = {};

	orders.forEach(order => {
		order.items.forEach(item => {
			if (!categorySales[item.category]) {
				categorySales[item.category] = 0;
				categoryOrders[item.category] = 0;
			}

			categorySales[item.category] += item.amount;
			categoryOrders[item.category]++;
		});
	});

	const categorySalesArray = Object.keys(categorySales).map(category => ({
		category,
		value: parseFloat(categorySales[category].toFixed(2)),
	}));

	const categoryOrdersArray = Object.keys(categoryOrders).map(category => ({
		category,
		value: categoryOrders[category],
	}));

	// Calculate sales by platform
	const platformSales = {};

	orders.forEach(order => {
		order.items.forEach(item => {
			if (!platformSales[item.platform]) {
				platformSales[item.platform] = 0;
			}

			platformSales[item.platform] += item.amount;
		});
	});

	const platformSalesArray = Object.keys(platformSales).map(platform => ({
		platform,
		value: parseFloat(platformSales[platform].toFixed(2)),
	}));

	return {
		dailySales,
		dailyOrders,
		monthlySales,
		monthlyOrders,
		categorySales: categorySalesArray,
		categoryOrders: categoryOrdersArray,
		platformSales: platformSalesArray,
	};
};

const salesData = calculateSalesData(orders);

// Get the total revenue, orders count and low stock products
const getTotalRevenue = () => {
	return parseFloat(orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2));
};

const getTotalOrders = () => {
	return orders.length;
};

const getLowStockProducts = () => {
	return products.filter(product => product.stock < product.threshold);
};

// Dashboard service functions
export const getDashboardData = () => {
	return {
		totalRevenue: getTotalRevenue(),
		totalOrders: getTotalOrders(),
		lowStockProducts: getLowStockProducts(),
		recentOrders: orders.slice(-5).reverse(),
		salesData,
	};
};

// Revenue service functions
export const getRevenueData = () => {
	return {
		totalRevenue: getTotalRevenue(),
		totalOrders: getTotalOrders(),
		salesData,
	};
};

// Inventory service functions
export const getProducts = () => {
	return [...products];
};

export const getProduct = id => {
	return products.find(product => product.id === id);
};

export const updateProductStock = (id, newStock) => {
	const product = products.find(product => product.id === id);
	if (product) {
		product.stock = newStock;
		return true;
	}
	return false;
};

export const addProduct = product => {
	const newId = Math.max(...products.map(p => p.id)) + 1;
	const newProduct = {
		...product,
		id: newId,
	};
	products.push(newProduct);
	return newProduct;
};

export default {
	getDashboardData,
	getRevenueData,
	getProducts,
	getProduct,
	updateProductStock,
	addProduct,
};
