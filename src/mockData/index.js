// Import generators
import generateProducts from "./generators/productGenerator";
import generateOrders from "./generators/orderGenerator";

// Import calculators
import calculateSalesData from "./calculators/salesCalculator";
import statsCalculator from "./calculators/statsCalculator";

// Import services
import getDashboardData from "./services/dashboardService";
import getRevenueData from "./services/revenueService";
import InventoryService from "./services/inventoryService";

// Generate base data
const products = generateProducts();
const orders = generateOrders(products);
const salesData = calculateSalesData(orders);

// Create inventory service instance
const inventoryService = new InventoryService(products);

// Export service functions
export const mockServices = {
	// Dashboard service
	getDashboardData: () => getDashboardData(products, orders, salesData),

	// Revenue service
	getRevenueData: () => getRevenueData(orders, salesData),

	// Inventory services
	getProducts: () => inventoryService.getProducts(),
	getProduct: id => inventoryService.getProduct(id),
	updateProductStock: (id, newStock) => inventoryService.updateProductStock(id, newStock),
	addProduct: product => inventoryService.addProduct(product),
};

// Export direct data access - useful for testing
export const mockData = {
	products,
	orders,
	salesData,
};

export default mockServices;
