
import { Search } from 'lucide-react';

function InventoryFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  platformFilter,
  setPlatformFilter,
  stockFilter,
  setStockFilter,
  allCategories,
  allPlatforms
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="all">All Platforms</option>
            {allPlatforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${stockFilter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
              }`}
            onClick={() => setStockFilter('all')}
          >
            All Stock
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${stockFilter === 'low' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}
            onClick={() => setStockFilter('low')}
          >
            Low Stock
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${stockFilter === 'out' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}
            onClick={() => setStockFilter('out')}
          >
            Out of Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryFilters;