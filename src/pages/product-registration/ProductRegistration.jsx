
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