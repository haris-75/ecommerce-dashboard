import statsCalculator from "../calculators/statsCalculator";

/**
 * Provides data needed for revenue analysis
 * @param {Array} orders - Array of order objects
 * @param {Object} salesData - Object containing various sales metrics
 * @returns {Object} Revenue data
 */
export const getRevenueData = (orders, salesData) => {
	return {
		totalRevenue: statsCalculator.getTotalRevenue(orders),
		totalOrders: statsCalculator.getTotalOrders(orders),
		salesData,
	};
};

export default getRevenueData;
