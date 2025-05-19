import { useState, useEffect } from 'react';
import { getProducts } from '../../mockData';

import useInventoryFilters from './hooks/useInventoryFilters';
import useStockManagement from './hooks/useStockManagement';

import InventorySummary from './components/InventorySummary';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';

import HocLoader from '../../components/HocLoader'
import Header from '../../components/Header'

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    platformFilter,
    setPlatformFilter,
    stockFilter,
    setStockFilter,
    allCategories,
    allPlatforms,
    filteredProducts,
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    paginate,
    nextPage,
    prevPage,
    sortConfig,
    handleSort,
  } = useInventoryFilters(products);

  const stockManagement = useStockManagement(products, setProducts);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const inventoryData = getProducts();
      setProducts(inventoryData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <HocLoader isLoading={loading}>
      <div className="space-y-6">
        <Header title='Inventory Management' />

        <InventorySummary products={products} />

        <InventoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          allCategories={allCategories}
          allPlatforms={allPlatforms}
        />

        <InventoryTable
          filteredProducts={filteredProducts}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          sortConfig={sortConfig}
          handleSort={handleSort}
          stockManagement={stockManagement}
        />
      </div>
    </HocLoader>
  );
}

export default InventoryManagement;