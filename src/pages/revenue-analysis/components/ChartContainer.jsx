
function ChartContainer({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-64 md:h-72">
        {children}
      </div>
    </div>
  );
}

export default ChartContainer;