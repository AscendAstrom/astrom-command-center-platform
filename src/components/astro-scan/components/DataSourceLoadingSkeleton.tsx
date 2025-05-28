
export const DataSourceLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-800/30 rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};
