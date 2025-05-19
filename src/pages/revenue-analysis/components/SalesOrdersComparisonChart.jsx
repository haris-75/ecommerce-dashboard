
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer'

function SalesOrdersComparisonChart({ salesData, ordersData, timeRange }) {
  return (
    <ChartContainer title={`${timeRange === 'daily' ? 'Daily' : 'Monthly'} Orders vs Revenue`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesData}
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
            data={ordersData}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default SalesOrdersComparisonChart;
