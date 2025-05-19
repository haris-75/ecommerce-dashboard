import FormField from '../../../components/FormField';

const ProductBasicInfo = ({ formData, onChange, errors, categories, platforms }) => {
  return (
    <div className="space-y-6">
      <FormField
        id="name"
        label="Product Name"
        value={formData.name}
        onChange={onChange}
        error={errors.name}
        required={true}
      />

      <FormField
        id="description"
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={onChange}
        error={errors.description}
        required={true}
      />

      <FormField
        id="category"
        label="Category"
        type="select"
        value={formData.category}
        onChange={onChange}
        options={categories}
      />

      <FormField
        id="platform"
        label="Platform"
        type="select"
        value={formData.platform}
        onChange={onChange}
        options={platforms}
      />
    </div>
  );
};

export default ProductBasicInfo;