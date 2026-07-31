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
