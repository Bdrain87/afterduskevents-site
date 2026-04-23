export default function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-hidden="true">
      <div>
        <div className="h-3 w-16 bg-charcoal rounded mb-2" />
        <div className="h-10 w-full bg-charcoal rounded-lg" />
      </div>
      <div>
        <div className="h-3 w-20 bg-charcoal rounded mb-2" />
        <div className="h-10 w-full bg-charcoal rounded-lg" />
      </div>
      <div>
        <div className="h-3 w-28 bg-charcoal rounded mb-2" />
        <div className="h-10 w-full bg-charcoal rounded-lg" />
      </div>
      <div className="h-12 w-full bg-charcoal/60 rounded-lg" />
    </div>
  );
}
