function RecentOrders({ recentOrders }) {
  return <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders?.map(({ id, orderDate, customer, totalAmount, status }) => (
            <tr key={id}>
              <td className="py-2 px-4 border-b border-gray-200">{id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{new Date(orderDate)?.toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b border-gray-200">{customer}</td>
              <td className="py-2 px-4 border-b border-gray-200">${totalAmount?.toLocaleString()}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}
export default RecentOrders