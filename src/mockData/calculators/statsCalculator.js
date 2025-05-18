/**
 * Contains utility functions for calculating general statistics from orders and products
 */

/**
 * Calculate total revenue from all orders
 * @param {Array} orders - Array of order objects
 * @returns {number} Total revenue
 */
export const getTotalRevenue = orders => {
	return parseFloat(orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2));
};

/**
 * Get total count of orders
 * @param {Array} orders - Array of order objects
 * @returns {number} Total number of orders
 */
export const getTotalOrders = orders => {
	return orders.length;
};

/**
 * Get products that are below their stock threshold
 * @param {Array} products - Array of product objects
 * @returns {Array} Array of products with low stock
 */
export const getLowStockProducts = products => {
	return products.filter(product => product.stock < product.threshold);
};

export default {
	getTotalRevenue,
	getTotalOrders,
	getLowStockProducts,
};
