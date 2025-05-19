
import { DollarSign, ShoppingBag } from 'lucide-react';

import { useRevenueData } from './hooks/useRevenueData'

import KeyMetricCard from './components/KeyMetricCard'
import FilterSection from './components/FilterSection'
import RevenueTimeChart from './components/RevenueTimeChart'
import RevenuePlatformChart from './components/RevenuePlatformChart'
import RevenueCategoryChart from './components/RevenueCategoryChart';
import SalesOrdersComparisonChart from './components/SalesOrdersComparisonChart';

import HocLoader from '../../components/HocLoader'
import Header from '../../components/Header'


function RevenueAnalysis() {
  const {
    data,
    loading,
    timeRange,
    setTimeRange,
    categoryFilter,
    setCategoryFilter,
    platformFilter,
    setPlatformFilter,
    timeRangeData,
    categoryData,
    platformData,
    categories,
    platforms,
    ordersData
  } = useRevenueData();

  return (
    <HocLoader isLoading={loading || !data}>
      <div className="space-y-6">
        <Header title='Revenue Analysis' />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KeyMetricCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${data?.totalRevenue?.toLocaleString()}`}
            color="green"
          />
          <KeyMetricCard
            icon={ShoppingBag}
            title="Total Orders"
            value={data?.totalOrders}
            color="blue"
          />
        </div>

        <FilterSection
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
          categories={categories}
          platforms={platforms}
        />

        <RevenueTimeChart data={timeRangeData} timeRange={timeRange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueCategoryChart data={categoryData} />
          <RevenuePlatformChart data={platformData} />
        </div>

        <SalesOrdersComparisonChart
          salesData={timeRangeData}
          ordersData={ordersData}
          timeRange={timeRange}
        />
      </div>
    </HocLoader>
  );
}

export default RevenueAnalysis;