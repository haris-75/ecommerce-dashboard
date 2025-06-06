function HocLoader({ children, isLoading }) {
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  }
  return <>
    {children}
  </>
}
export default HocLoader;