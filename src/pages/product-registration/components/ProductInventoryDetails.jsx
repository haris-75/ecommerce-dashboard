import FormField from '../../../components/FormField';

const ProductInventoryDetails = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <FormField
        id="price"
        label="Price ($)"
        type="number"
        value={formData.price}
        onChange={onChange}
        error={errors.price}
        required={true}
        step="0.01"
        min="0"
      />

      <FormField
        id="stock"
        label="Initial Stock"
        type="number"
        value={formData.stock}
        onChange={onChange}
        error={errors.stock}
        required={true}
        step="1"
        min="0"
      />

      <FormField
        id="threshold"
        label="Low Stock Threshold"
        type="number"
        value={formData.threshold}
        onChange={onChange}
        error={errors.threshold}
        step="1"
        min="0"
      />
    </div>
  );
};

export default ProductInventoryDetails;