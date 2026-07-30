import ContentGrid from "~/components/ContentGrid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FiTv } from "react-icons/fi";
import { fetchTrendingTvShows } from "~/services/api";
import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import type { Media } from "~/types";
import SkeletonCard from "~/components/SkeletonCard";

function TvShowsPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // trending series this week with infinite scroll query
  const {
    data: trendingTvShows,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tvShows"],
    queryFn: ({ pageParam }) => fetchTrendingTvShows(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // extracting series data from query data and removing duplicates from later pages
  const tvShows =
    trendingTvShows?.pages.reduce<Media[]>((acc, page) => {
      page.results.forEach((movie: Media) => {
        if (!acc.some((existingMovie) => existingMovie.id === movie.id)) {
          acc.push(movie);
        }
      });
      return acc;
    }, []) ?? [];

  // intersection observer to trigger div and fetch next page
  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="p-4 bg-background text-primary min-h-screen">
      {/* heading */}
      <div className="flex gap-4 p-4 border-b border-white/10 mb-6">
        <div className="flex items-center justify-center px-4 rounded-xl text-2xl bg-black/10 border border-white/10 text-red-400">
          <FiTv />
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking wider text-white mb-1">
            TV Shows
          </h2>
          <p className="text-red-500 rounded-full px-3 py-1 bg-red-600/20 border border-white/20 backdrop-blur-2xl tracking-widest text-[10px] uppercase font-bold">
            trending <span className="text-gray-300">this week</span>
          </p>
        </div>
      </div>

      {/* skeleton loading and content grid */}
      {isLoading ? (
        <div className="grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          <SkeletonCard />
        </div>
      ) : (
        <div className="grow">
          <ContentGrid data={tvShows} />
        </div>
      )}

      {/* ref container and loader */}
      <div ref={loadMoreRef} className="mt-6 flex items-center justify-center">
        {isFetchingNextPage && <ClipLoader className="font-bold" color="red" />}
      </div>
      {isError && (
        <p className="text-center text-red-400 mt-4">
          Something went wrong while loading more movies.
        </p>
      )}
    </div>
  );
}

export default TvShowsPage;
