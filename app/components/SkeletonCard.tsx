import Skeleton from "react-loading-skeleton";

// using when the movie,series,and search pages loads first time
function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="relative w-full h-full rounded-xl border border-white/10"
        >
          <div className="aspect-2/3 w-full ">
            <Skeleton
              width="100%"
              height="100%"
              className="h-full w-full rounded-t-lg"
            />
          </div>
          <div className="p-2">
            <Skeleton height={20} width="80%" className="mt-2" />
            <Skeleton height={10} width="40%" className="mt-2" />
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;

// skeleton for content row card
export function RowSkeletonCard() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="min-w-45 rounded-xl border border-white/10">
          <div className="w-full h-70 bg-zinc-800 animate-pulse relative rounded-t-xl" />
          <div className="p-2">
            <div className="h-4 w-[80%] rounded-xl animate-pulse bg-zinc-800 mb-2" />
            <div className="h-3 w-[40%] rounded-xl animate-pulse bg-zinc-800" />
          </div>
        </div>
      ))}
    </>
  );
}

// skeleton for details page
export function DetailsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 w-full min-h-[70vh]">
        {/* Background */}
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />

        {/* Back Button */}
        <div className="absolute z-50 top-0 left-0 right-0 pt-10 pl-5 md:pl-15 pb-5">
          <div className="h-11 w-28 rounded-full bg-zinc-800 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-40 h-full flex flex-col md:flex-row py-20 items-end gap-8 px-6 md:px-12 lg:px-16">
          {/* Poster */}
          <div className="hidden md:block w-48 h-75 lg:w-64 lg:h-90 rounded-2xl bg-zinc-800 animate-pulse shrink-0" />

          {/* Right Content */}
          <div className="flex-1 max-w-3xl">
            {/* Tagline */}
            <div className="h-4 w-32 bg-zinc-800 animate-pulse mb-4 rounded-xl" />

            {/* Title */}
            <div className="space-y-3 mb-6">
              <div className="h-10 w-3/4 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-10 w-1/2 rounded-xl bg-zinc-800 animate-pulse" />
            </div>

            {/* Meta */}
            <div className="flex gap-4 mb-5">
              <div className="h-5 w-24 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-5 w-20 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-5 w-16 rounded-xl bg-zinc-800 animate-pulse" />
            </div>

            {/* Genres */}
            <div className="flex gap-3 flex-wrap mb-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 rounded-full bg-zinc-800 animate-pulse"
                />
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-4 w-11/12 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-4 w-10/12 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="h-4 w-8/12 rounded-xl bg-zinc-800 animate-pulse" />
            </div>

            {/* Button */}
            <div className="h-12 w-48 rounded-lg bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Server Buttons */}
      <div className="relative px-6 sm:px-14 lg:px-16 pb-10 max-w-7xl mx-auto">
        <div className="flex gap-3 mb-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-lg bg-zinc-800 animate-pulse"
            />
          ))}
        </div>

        {/* Player */}
        <div className="aspect-video rounded-2xl bg-zinc-800 animate-pulse" />
      </div>

      {/* Cast Row */}
      <div className="px-6 sm:px-14 lg:px-16 pb-12">
        <div className="h-7 w-40 rounded bg-zinc-800 animate-pulse mb-6" />

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="min-w-32">
              <div className="w-32 h-44 rounded-xl bg-zinc-800 animate-pulse mb-3" />
              <div className="h-4 w-24 rounded bg-zinc-800 animate-pulse mb-2" />
              <div className="h-3 w-16 rounded bg-zinc-800 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
