/**
 * Generates mock order data based on products
 * @param {Array} products - Array of product objects
 * @returns {Array} Array of order objects
 */
export const generateOrders = products => {
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

export default generateOrders;
