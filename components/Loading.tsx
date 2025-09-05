export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e9c302] border-t-transparent"></div>
      <span className="ml-3 text-lg font-semibold text-[#e9c302]">
        Loading...
      </span>
    </div>
  );
}
