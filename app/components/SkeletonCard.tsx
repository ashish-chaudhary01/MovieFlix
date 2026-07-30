import Skeleton from "react-loading-skeleton";

function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="relative w-full h-full rounded-lg border border-white/10"
        >
          <div className="aspect-2/3 w-full">
            <Skeleton width="100%" height="100%" className="h-full w-full" />
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
