import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import RevenueAnalysis from './pages/revenue-analysis/RevenueAnalysis';
import InventoryManagement from './pages/inventory-management/InventoryManagement';
import ProductRegistration from './pages/product-registration/ProductRegistration';

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/revenue" element={<RevenueAnalysis />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/register" element={<ProductRegistration />} />
          <Route path="*" element={<Navigate to="/revenue" replace />} />
        </Routes>
      </main>
    </div>
  );
}
