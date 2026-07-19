import ContentGrid from "~/components/ContentGrid";
import { useWatchList } from "~/context/WatchlistContext";

function WatchlistPage() {
  const { watchList } = useWatchList();
  return (
    <div className="p-4 min-h-screen w-full">
      {/* heading */}
      <div className="border-b border-white/10 py-6 px-3 mb-5">
        <h2 className="font-bold text-3xl text-white border-l-4 border-red-500 px-2">
          My WatchList
        </h2>
      </div>
      {/* grid section */}
      {watchList.length === 0 ? (
        <div className="text-center text-gray-300 font-semibold text-sm">
          Watchlist is empty!
        </div>
      ) : (
        <ContentGrid data={watchList} />
      )}
    </div>
  );
}

export default WatchlistPage;
