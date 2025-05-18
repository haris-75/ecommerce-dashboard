// pages/RevenueAnalysis.jsx - Revenue analysis page with filters and charts
import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { getRevenueData } from '../mockData';
import { DollarSign, ShoppingBag } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function RevenueAnalysis() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('daily');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      const revenueData = getRevenueData();
      setData(revenueData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !data) {
    return <div className="flex justify-center items-center h-full">
      <div className="text-xl font-semibold">Loading revenue data...</div>
    </div>;
  }

  // Determine which data to use based on time range
  const getTimeRangeData = () => {
    switch (timeRange) {
      case 'daily':
        return data.salesData.dailySales;
      case 'monthly':
        return data.salesData.monthlySales;
      default:
        return data.salesData.dailySales;
    }
  };

  // Get filtered category data
  const getCategoryData = () => {
    if (categoryFilter === 'all') {
      return data.salesData.categorySales;
    } else {
      return data.salesData.categorySales.filter(item => item.category === categoryFilter);
    }
  };

  // Get platform data
  const getPlatformData = () => {
    if (platformFilter === 'all') {
      return data.salesData.platformSales;
    } else {
      return data.salesData.platformSales.filter(item => item.platform === platformFilter);
    }
  };

  // Get all available categories
  const allCategories = [...new Set(data.salesData.categorySales.map(item => item.category))];

  // Get all available platforms
  const allPlatforms = [...new Set(data.salesData.platformSales.map(item => item.platform))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Revenue Analysis</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold">${data.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <ShoppingBag size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold">{data.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
      </div>

      {/* Revenue Over Time Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {timeRange === 'daily' ? 'Daily Revenue (Last 30 Days)' : 'Monthly Revenue (2025)'}
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getTimeRangeData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === 'daily' ? 'date' : 'month'} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Revenue"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Category and Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="category"
                  label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Platform */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue by Platform</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getPlatformData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="value" name="Revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales vs Orders Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {timeRange === 'daily' ? 'Daily Orders vs Revenue' : 'Monthly Orders vs Revenue'}
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeRange === 'daily' ? data.salesData.dailySales : data.salesData.monthlySales}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === 'daily' ? 'date' : 'month'} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  return name === 'Revenue' ? [`$${value.toLocaleString()}`, name] : [value, name];
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="value"
                name="Revenue"
                fill="#82ca9d"
              />
              <Bar
                yAxisId="right"
                dataKey="value"
                name="Orders"
                fill="#8884d8"
                data={timeRange === 'daily' ? data.salesData.dailyOrders : data.salesData.monthlyOrders}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default RevenueAnalysis;