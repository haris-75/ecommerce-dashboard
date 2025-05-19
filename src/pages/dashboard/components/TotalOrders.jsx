
import { ArrowUp, ShoppingBag } from 'lucide-react';

function TotalOrders({ totalOrders }) {
  return <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 mr-4">
        <ShoppingBag size={24} className="text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
        <p className="text-2xl font-bold">{totalOrders}</p>
      </div>
    </div>
    <div className="mt-4 flex items-center text-green-500">
      <ArrowUp size={16} />
      <span className="ml-1 text-sm">8% from last month</span>
    </div>
  </div>
}

export default TotalOrders;