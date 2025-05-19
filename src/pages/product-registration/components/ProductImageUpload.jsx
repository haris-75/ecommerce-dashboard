import { Image } from 'lucide-react';

const ProductImageUpload = ({ imagePreview, onImageChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Product Image</label>
      <div className="mt-1 flex items-center">
        <div className="mr-5">
          <img
            src={imagePreview}
            alt="Product preview"
            className="h-24 w-24 object-cover rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={onImageChange}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Image className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          Select Image
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Click to generate a new placeholder image
      </p>
    </div>
  );
};

export default ProductImageUpload;