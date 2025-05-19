
import { Save, X } from 'lucide-react';

function EditableStockCell({
  product,
  isEditing,
  editingStock,
  setEditingStock,
  handleSave,
  handleCancel
}) {
  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          value={editingStock}
          onChange={(e) => setEditingStock(e.target.value)}
          className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => handleSave(product.id)}
            className="text-green-600 hover:text-green-900"
          >
            <Save size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-900"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock === 0
      ? 'bg-red-100 text-red-800'
      : product.stock < product.threshold
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-green-100 text-green-800'
      }`}>
      {product.stock}
    </span>
  );
}

export default EditableStockCell;