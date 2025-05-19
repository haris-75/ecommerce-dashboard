
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer'

function RevenuePlatformChart({ data }) {
  return (
    <ChartContainer title="Revenue by Platform">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
          <Legend />
          <Bar dataKey="value" name="Revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default RevenuePlatformChart;

