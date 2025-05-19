// import { useState } from 'react';
// import { Package, Image, Save, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { addProduct } from '../../mockData';
// import Header from '../../components/Header';

// function ProductRegistration() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: 'Electronics',
//     price: '',
//     stock: '',
//     threshold: '10',
//     platform: 'Amazon',
//     image: '/api/placeholder/300/300'
//   });

//   const [imagePreview, setImagePreview] = useState('/api/placeholder/300/300');
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Available categories and platforms from your existing data
//   const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Books"];
//   const platforms = ["Amazon", "Walmart"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'price' || name === 'stock' || name === 'threshold'
//         ? value === '' ? '' : parseFloat(value)
//         : value
//     }));

//     // Clear error for this field when user makes changes
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };

//   const handleImageChange = () => {
//     const randomSize = Math.floor(Math.random() * 100) + 300;
//     const newImageUrl = `/api/placeholder/${randomSize}/${randomSize}`;

//     setImagePreview(newImageUrl);
//     setFormData(prev => ({
//       ...prev,
//       image: newImageUrl
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.description.trim()) newErrors.description = 'Description is required';

//     if (formData.price === '' || isNaN(formData.price)) {
//       newErrors.price = 'Valid price is required';
//     } else if (formData.price < 0) {
//       newErrors.price = 'Price cannot be negative';
//     }

//     if (formData.stock === '' || isNaN(formData.stock)) {
//       newErrors.stock = 'Valid stock quantity is required';
//     } else if (formData.stock < 0) {
//       newErrors.stock = 'Stock cannot be negative';
//     }

//     if (formData.threshold === '' || isNaN(formData.threshold)) {
//       newErrors.threshold = 'Valid threshold is required';
//     } else if (formData.threshold < 0) {
//       newErrors.threshold = 'Threshold cannot be negative';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     // Convert string values to appropriate types
//     const productData = {
//       ...formData,
//       price: parseFloat(formData.price),
//       stock: parseInt(formData.stock),
//       threshold: parseInt(formData.threshold)
//     };

//     // Simulate API delay
//     setTimeout(() => {
//       try {
//         // Add product using the existing service function
//         const newProduct = addProduct(productData);
//         console.log('Product added:', newProduct);

//         setIsSubmitting(false);
//         setShowSuccess(true);

//         // Reset form after 2 seconds and redirect to inventory page
//         setTimeout(() => {
//           setShowSuccess(false);
//           navigate('/inventory-management');
//         }, 2000);
//       } catch (error) {
//         console.error('Error adding product:', error);
//         setIsSubmitting(false);
//         setErrors({ submit: 'Failed to add product. Please try again.' });
//       }
//     }, 800);
//   };

//   const handleCancel = () => {
//     navigate('/inventory-management');
//   };

//   return (
//     <div className="space-y-6">
//       <Header title='Product Registration' />

//       {showSuccess && (
//         <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-5">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <Package className="h-5 w-5 text-green-400" aria-hidden="true" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-green-700">
//                 Product successfully added to inventory!
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-6">
//               {/* Product Name */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//                 />
//                 {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
//               </div>

//               {/* Description */}
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   id="description"
//                   rows="3"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//                 ></textarea>
//                 {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
//               </div>

//               {/* Category */}
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   {categories.map(category => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Platform */}
//               <div>
//                 <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
//                   Platform
//                 </label>
//                 <select
//                   name="platform"
//                   id="platform"
//                   value={formData.platform}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   {platforms.map(platform => (
//                     <option key={platform} value={platform}>{platform}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Price */}
//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                   Price ($) *
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   name="price"
//                   id="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//                 />
//                 {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
//               </div>

//               {/* Stock */}
//               <div>
//                 <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
//                   Initial Stock *
//                 </label>
//                 <input
//                   type="number"
//                   step="1"
//                   min="0"
//                   name="stock"
//                   id="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border ${errors.stock ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//                 />
//                 {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
//               </div>

//               {/* Threshold */}
//               <div>
//                 <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
//                   Low Stock Threshold
//                 </label>
//                 <input
//                   type="number"
//                   step="1"
//                   min="0"
//                   name="threshold"
//                   id="threshold"
//                   value={formData.threshold}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full px-3 py-2 border ${errors.threshold ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
//                 />
//                 {errors.threshold && <p className="mt-1 text-sm text-red-600">{errors.threshold}</p>}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Product Image</label>
//                 <div className="mt-1 flex items-center">
//                   <div className="mr-5">
//                     <img
//                       src={imagePreview}
//                       alt="Product preview"
//                       className="h-24 w-24 object-cover rounded-md"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={handleImageChange}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     <Image className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
//                     Select Image
//                   </button>
//                 </div>
//                 <p className="mt-2 text-xs text-gray-500">
//                   Click to generate a new placeholder image
//                 </p>
//               </div>
//             </div>
//           </div>

//           {errors.submit && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <X className="h-5 w-5 text-red-400" aria-hidden="true" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{errors.submit}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 <span className="flex items-center">
//                   <Save className="mr-2 h-5 w-5" aria-hidden="true" />
//                   Save Product
//                 </span>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProductRegistration;







import { useProductRegistration } from './hooks/useProductRegistration';

import SuccessAlert from './components/SuccessAlert';
import ErrorAlert from './components/ErrorAlert';
import ProductBasicInfo from './components/ProductBasicInfo';
import ProductInventoryDetails from './components/ProductInventoryDetails';
import ProductImageUpload from './components/ProductImageUpload';
import FormActions from './components/FormActions';

import Header from '../../components/Header';

function ProductRegistration() {
  const {
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
    handleCancel
  } = useProductRegistration();

  return (
    <div className="space-y-6">
      <Header title='Product Registration' />

      <SuccessAlert show={showSuccess} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <ProductBasicInfo
              formData={formData}
              onChange={handleChange}
              errors={errors}
              categories={categories}
              platforms={platforms}
            />

            {/* Right Column */}
            <div className="space-y-6">
              <ProductInventoryDetails
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />

              <ProductImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
            </div>
          </div>

          <ErrorAlert errorMessage={errors.submit} />

          <FormActions
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}

export default ProductRegistration;