// hooks/useStockManagement.js
import { useState } from "react";
import { updateProductStock } from "../../../mockData";

export default function useStockManagement(products, setProducts) {
	const [editingId, setEditingId] = useState(null);
	const [editingStock, setEditingStock] = useState("");

	const handleEdit = (productId, currentStock) => {
		setEditingId(productId);
		setEditingStock(currentStock.toString());
	};

	const handleSave = productId => {
		const newStock = parseInt(editingStock);
		if (!isNaN(newStock) && newStock >= 0) {
			updateProductStock(productId, newStock);
			setProducts(products.map(product => (product.id === productId ? { ...product, stock: newStock } : product)));
			setEditingId(null);
		}
	};

	const handleCancel = () => {
		setEditingId(null);
	};

	return {
		editingId,
		editingStock,
		setEditingStock,
		handleEdit,
		handleSave,
		handleCancel,
	};
}
