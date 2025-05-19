/**
 * Generates mock product data
 * @returns {Array} Array of product objects
 */

import { getImageId } from "../../helpers";
export const generateProducts = () => {
	const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Books"];
	const platforms = ["Amazon", "Walmart"];

	const products = [];

	for (let i = 1; i <= 50; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)];
		const platform = platforms[Math.floor(Math.random() * platforms.length)];
		const price = parseFloat((Math.random() * 200 + 10).toFixed(2));
		const stock = Math.floor(Math.random() * 100);
		const image = getImageId();

		products.push({
			id: i,
			name: `Product ${i}`,
			description: `This is a sample description for product ${i}`,
			category,
			price,
			stock,
			threshold: 10,
			platform,
			image,
		});
	}

	return products;
};

export default generateProducts;
