import { Package } from 'lucide-react';

const SuccessAlert = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Package className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-700">
            Product successfully added to inventory!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;