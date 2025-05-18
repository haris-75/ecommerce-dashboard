// pages/InventoryManagement.jsx - Inventory management with filtering, sorting and stock updates
import { useState, useEffect } from 'react';
import { getProducts, updateProductStock } from '../mockData';
import { Package, Search, AlertTriangle, Check, X, Edit, Save } from 'lucide-react';

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [editingId, setEditingId] = useState(null);
  const [editingStock, setEditingStock] = useState('');

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      const inventoryData = getProducts();
      setProducts(inventoryData);
      setFilteredProducts(inventoryData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filter and sort products whenever any filter changes
    applyFilters();
  }, [searchTerm, categoryFilter, platformFilter, stockFilter, sortConfig, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Apply platform filter
    if (platformFilter !== 'all') {
      result = result.filter(product => product.platform === platformFilter);
    }

    // Apply stock filter
    if (stockFilter === 'low') {
      result = result.filter(product => product.stock < product.threshold);
    } else if (stockFilter === 'out') {
      result = result.filter(product => product.stock === 0);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(result);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (productId, currentStock) => {
    setEditingId(productId);
    setEditingStock(currentStock.toString());
  };

  const handleSave = (productId) => {
    const newStock = parseInt(editingStock);
    if (!isNaN(newStock) && newStock >= 0) {
      // Update the product stock
      updateProductStock(productId, newStock);

      // Update local state
      setProducts(products.map(product =>
        product.id === productId ? { ...product, stock: newStock } : product
      ));

      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  // Get all available categories and platforms
  const allCategories = [...new Set(products.map(product => product.category))];
  const allPlatforms = [...new Set(products.map(product => product.platform))];

  if (loading) {
    return <div className="flex justify-center items-center h-full">
      <div className="text-xl font-semibold">Loading inventory data...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Package size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Low Stock Items</p>
              <p className="text-2xl font-bold">
                {products.filter(product => product.stock < product.threshold && product.stock > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <X size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Out of Stock</p>
              <p className="text-2xl font-bold">
                {products.filter(product => product.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Product {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}
                >
                  Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('platform')}
                >
                  Platform {sortConfig.key === 'platform' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-400">{product.description.substring(0, 30)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        min="0"
                        value={editingStock}
                        onChange={(e) => setEditingStock(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock < product.threshold
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                        }`}>
                        {product.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === product.id ? (
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
                    ) : (
                      <button
                        onClick={() => handleEdit(product.id, product.stock)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryManagement;