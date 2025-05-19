
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer'

function RevenueTimeChart({ data, timeRange }) {
  return (
    <ChartContainer title={timeRange === 'daily' ? 'Daily Revenue (Last 30 Days)' : 'Monthly Revenue (2025)'}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
    </ChartContainer>
  );
}

export default RevenueTimeChart;