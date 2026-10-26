// The one empty-state box: board columns, notes and the timeline all use it.
const EmptyState = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-dashed border-empty-border px-4 py-6 text-center">
    {children}
  </div>
);

export default EmptyState;
