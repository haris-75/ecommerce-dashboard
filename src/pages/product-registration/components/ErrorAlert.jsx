import { X } from 'lucide-react';

const ErrorAlert = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <X className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;