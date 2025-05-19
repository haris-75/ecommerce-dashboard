import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../mockData";
import { getImageId } from "../../../helpers";

export const useProductRegistration = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "Electronics",
		price: "",
		stock: "",
		threshold: "10",
		platform: "Amazon",
		image: 1,
	});

	const [imagePreview, setImagePreview] = useState(1);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Books"];
	const platforms = ["Amazon", "Walmart"];

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]:
				name === "price" || name === "stock" || name === "threshold" ? (value === "" ? "" : parseFloat(value)) : value,
		}));

		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const handleImageChange = () => {
		const imageId = getImageId();

		setImagePreview(imageId);
		setFormData(prev => ({
			...prev,
			image: imageId,
		}));
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Product name is required";
		if (!formData.description.trim()) newErrors.description = "Description is required";

		if (formData.price === "" || isNaN(formData.price)) {
			newErrors.price = "Valid price is required";
		} else if (formData.price < 0) {
			newErrors.price = "Price cannot be negative";
		}

		if (formData.stock === "" || isNaN(formData.stock)) {
			newErrors.stock = "Valid stock quantity is required";
		} else if (formData.stock < 0) {
			newErrors.stock = "Stock cannot be negative";
		}

		if (formData.threshold === "" || isNaN(formData.threshold)) {
			newErrors.threshold = "Valid threshold is required";
		} else if (formData.threshold < 0) {
			newErrors.threshold = "Threshold cannot be negative";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		const productData = {
			...formData,
			price: parseFloat(formData.price),
			stock: parseInt(formData.stock),
			threshold: parseInt(formData.threshold),
		};

		setTimeout(() => {
			try {
				const newProduct = addProduct(productData);
				console.log("Product added:", newProduct);

				setIsSubmitting(false);
				setShowSuccess(true);

				setTimeout(() => {
					setShowSuccess(false);
					navigate("/inventory-management");
				}, 2000);
			} catch (error) {
				console.error("Error adding product:", error);
				setIsSubmitting(false);
				setErrors({ submit: "Failed to add product. Please try again." });
			}
		}, 800);
	};

	const handleCancel = () => {
		navigate("/inventory-management");
	};

	return {
		formData,
		imagePreview,
		errors,
		isSubmitting,
		showSuccess,
		categories,
		platforms,
		handleChange,
		handleImageChange,
		handleSubmit,
		handleCancel,
	};
};
