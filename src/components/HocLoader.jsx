function HocLoader({ children, isLoading }) {
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <div className="text-xl font-semibold">Loading dashboard data...</div>
    </div>;
  }
  return <>
    {children}
  </>
}
export default HocLoader;