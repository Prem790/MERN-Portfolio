import React from "react";

/** A single shimmering placeholder block. */
export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

/**
 * Full-page skeleton shown while the portfolio data loads,
 * replacing the old full-screen blocking spinner.
 */
function HomeSkeleton() {
  return (
    <div className="app-bg min-h-screen px-40 sm:px-5 pt-28">
      {/* Hero */}
      <div className="flex flex-col gap-6 h-[70vh] justify-center max-w-3xl">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-16 w-3/4" />
        <SkeletonBlock className="h-10 w-1/2" />
        <SkeletonBlock className="h-24 w-2/3" />
        <SkeletonBlock className="h-12 w-44 rounded-full" />
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 py-16">
        {[0, 1, 2].map((i) => (
          <div key={i} className="glass-card p-6 flex flex-col gap-4">
            <SkeletonBlock className="h-44 w-full rounded-xl" />
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSkeleton;
