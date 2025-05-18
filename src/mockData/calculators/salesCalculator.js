/**
 * Calculates various sales metrics based on orders data
 * @param {Array} orders - Array of order objects
 * @returns {Object} Object containing different sales metrics
 */
export const calculateSalesData = orders => {
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

export default calculateSalesData;
