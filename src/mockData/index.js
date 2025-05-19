// Import generators
import generateProducts from "./generators/productGenerator";
import generateOrders from "./generators/orderGenerator";

// Import calculators
import calculateSalesData from "./calculators/salesCalculator";

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

// Dashboard service
export const getDashboardPageData = () => getDashboardData(products, orders, salesData);

// Revenue service
export const getRevenuePageData = () => getRevenueData(orders, salesData);

// Inventory services
export const getProducts = () => inventoryService.getProducts();
export const getProduct = id => inventoryService.getProduct(id);
export const updateProductStock = (id, newStock) => inventoryService.updateProductStock(id, newStock);
export const addProduct = product => inventoryService.addProduct(product);

// Export direct data access - useful for testing
export const mockData = {
	products,
	orders,
	salesData,
};
