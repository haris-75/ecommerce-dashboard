import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RevenueAnalysis from './pages/RevenueAnalysis';
import InventoryManagement from './pages/InventoryManagement';
import ProductRegistration from './pages/ProductRegistration';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/revenue" element={<RevenueAnalysis />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/register" element={<ProductRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/revenue" replace />} />
        </Routes>
      </main>
    </div>
  );
}
