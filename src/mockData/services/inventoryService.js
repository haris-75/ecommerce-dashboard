/**
 * Service to handle inventory related operations
 */
export class InventoryService {
	constructor(products) {
		this.products = [...products];
	}

	/**
	 * Get all products
	 * @returns {Array} Array of all products
	 */
	getProducts() {
		return [...this.products];
	}

	/**
	 * Get a product by ID
	 * @param {number} id - Product ID
	 * @returns {Object|null} Product object or null if not found
	 */
	getProduct(id) {
		return this.products.find(product => product.id === id);
	}

	/**
	 * Update the stock level of a product
	 * @param {number} id - Product ID
	 * @param {number} newStock - New stock level
	 * @returns {boolean} Success status
	 */
	updateProductStock(id, newStock) {
		const product = this.products.find(product => product.id === id);
		if (product) {
			product.stock = newStock;
			return true;
		}
		return false;
	}

	/**
	 * Add a new product
	 * @param {Object} product - Product object without ID
	 * @returns {Object} New product with generated ID
	 */
	addProduct(product) {
		const newId = Math.max(...this.products.map(p => p.id)) + 1;
		const newProduct = {
			...product,
			id: newId,
		};
		this.products.push(newProduct);
		return newProduct;
	}
}

export default InventoryService;
