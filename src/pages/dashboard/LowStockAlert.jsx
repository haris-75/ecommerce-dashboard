
import { ArrowUp, AlertTriangle } from 'lucide-react';
function LowStockAlert({ lowStockProducts }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-red-100 mr-4">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Low Stock Items</p>
          <p className="text-2xl font-bold">{lowStockProducts?.length}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-red-500">
        <ArrowUp size={16} />
        <span className="ml-1 text-sm">{lowStockProducts?.length} items need attention</span>
      </div>
    </div>
  );
}

export default LowStockAlert;