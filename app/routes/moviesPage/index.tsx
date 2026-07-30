import { BiMoviePlay } from "react-icons/bi";
import ContentGrid from "~/components/ContentGrid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrendingThisWeekMovies } from "~/services/api";
import { useEffect, useRef } from "react";
import type { Media } from "~/types";
import { ClipLoader } from "react-spinners";
import SkeletonCard from "~/components/SkeletonCard";

function MoviesPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // trending movies this week with infinite scroll query
  const {
    data: trendingMoviesThisWeek,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trendingThisWeek-movies"],
    queryFn: ({ pageParam }) =>
      fetchTrendingThisWeekMovies(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // extracting movies data from query data and removing duplicates from later pages
  const movies =
    trendingMoviesThisWeek?.pages.reduce<Media[]>((acc, page) => {
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
          <BiMoviePlay />
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking wider text-white mb-1">
            Movies
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
          <ContentGrid data={movies} />
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

export default MoviesPage;
