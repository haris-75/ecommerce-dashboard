import statsCalculator from "../calculators/statsCalculator";

/**
 * Provides data needed for the dashboard
 * @param {Array} products - Array of product objects
 * @param {Array} orders - Array of order objects
 * @param {Object} salesData - Object containing various sales metrics
 * @returns {Object} Dashboard data
 */
export const getDashboardData = (products, orders, salesData) => {
	return {
		totalRevenue: statsCalculator.getTotalRevenue(orders),
		totalOrders: statsCalculator.getTotalOrders(orders),
		lowStockProducts: statsCalculator.getLowStockProducts(products),
		recentOrders: orders.slice(-5).reverse(),
		salesData,
	};
};

export default getDashboardData;
