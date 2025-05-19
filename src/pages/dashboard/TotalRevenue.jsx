
import { ArrowUp, DollarSign } from 'lucide-react';

function TotalRevenue({ totalRevenue }) {
  return <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-green-100 mr-4">
        <DollarSign size={24} className="text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
        <p className="text-2xl font-bold">${totalRevenue?.toLocaleString()}</p>
      </div>
    </div>
    <div className="mt-4 flex items-center text-green-500">
      <ArrowUp size={16} />
      <span className="ml-1 text-sm">12% from last month</span>
    </div>
  </div>
}

export default TotalRevenue;