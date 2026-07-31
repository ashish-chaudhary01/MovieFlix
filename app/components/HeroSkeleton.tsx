function HeroSkeleton() {
  return (
    <div className="relative h-[80vh] md:h-screen overflow-hidden">
      {/* background skelton*/}
      <div className="absolute inset-0 animate-pulse bg-zinc-900" />
      {/* content skeltons */}
      <div className="relative z-10 h-full px-8 md:px-20 py-20 max-w-2xl flex flex-col justify-end md:justify-center">
        {/* trending skelton */}
        <div className="bg-zinc-800 animate-pulse mb-4 rounded-full h-6 w-[30%] " />
        {/* title */}
        <div className="bg-zinc-800 animate-pulse mb-5 rounded-full h-15 w-[70%] " />
        {/* genres skeleton */}
        <div className="flex gap-3">
          <div className="h-6 w-16 rounded-full bg-zinc-800 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-zinc-800 animate-pulse" />
          <div className="h-6 w-24 rounded-full bg-zinc-800 animate-pulse" />
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse bg-zinc-800 rounded-full" />
          <div className="h-4 w-[90%] animate-pulse bg-zinc-800 rounded-full" />
          <div className="h-4 w-[60%] animate-pulse bg-zinc-800 rounded-full" />
          <div className="h-4 w-[55%] animate-pulse bg-zinc-800 rounded-full" />
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-12 w-40 rounded-full bg-zinc-800 animate-pulse" />
          <div className="h-12 w-40 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default HeroSkeleton;
