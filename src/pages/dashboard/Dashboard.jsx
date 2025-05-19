
import { useState, useEffect } from 'react';

import { getDashboardPageData } from '../../mockData';
import LowStockAlert from './LowStockAlert';
import TotalOrders from './TotalOrders';
import TotalRevenue from './TotalRevenue';
import ChartSection from './ChartSection';
import RecentOrders from './RecentOrders';
import HocLoader from '../../components/HocLoader';
import Header from '../../components/Header'



function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dashboardData = getDashboardPageData();
      setData(dashboardData);
      setLoading(false);
    }, 500);
  }, []);


  return (
    <HocLoader isLoading={loading || !data}>
      <div className="space-y-6">
        <Header title='Dashboard Overview' />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TotalRevenue totalRevenue={data?.totalRevenue} />
          <TotalOrders totalOrders={data?.totalOrders} />
          <LowStockAlert lowStockProducts={data?.lowStockProducts} />
        </div>

        <ChartSection salesData={data?.salesData} />
        <RecentOrders recentOrders={data?.recentOrders} />
      </div>
    </HocLoader>
  );
}

export default Dashboard;