import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState, useEffect, useRef } from "react";
import ContentGrid from "~/components/ContentGrid";
import { fetchAllTrending, fetchSearchResults } from "~/services/api";
import type { Media } from "~/types";
import { ClipLoader } from "react-spinners";
import { BiSlider } from "react-icons/bi";
import SkeletonCard from "~/components/SkeletonCard";
import { AnimatePresence, motion } from "motion/react";

function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 400); // delay of 400ms
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // load next page div
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [contentType, setContentType] = useState("all");

  // trending movies and series this week with infinite scroll query
  const {
    data: trendingAllThisWeek,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trendingAll", debouncedSearch, contentType],
    queryFn: ({ pageParam }) => {
      if (debouncedSearch.trim() === "") {
        return fetchAllTrending(contentType, pageParam as number);
      }
      return fetchSearchResults(debouncedSearch, pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // extracting movies and series data from query data and removing duplicates from later pages
  const SearchResults =
    trendingAllThisWeek?.pages.reduce<Media[]>((acc, page) => {
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
    <div className="min-h-screen p-4 sm:p-6 text-white bg-">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      {/* search section  */}
      <div className="max-w-3xl flex gap-2 shadow-2xl mb-6">
        <input
          type="text"
          placeholder="Search movies and series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="relative rounded-lg flex-1 px-6 py-3.5 text-sm placeholder:text-gray-500 text-gray-200 outline-none border-2 border-white/20 bg-[#131313] focus:border-red-500/90 shadow-inner"
        />
        {/* filter button and menu here */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`py-3.5 px-4 rounded-lg text-sm text-white border-2 border-white/20 flex gap-1 items-center font-bold tracking-wider ${isFilterOpen ? "bg-red-600" : "bg-[#131313] hover:bg-white/20"}`}
        >
          <BiSlider size={20} />
          <span className="hidden sm:block">Filters</span>
        </button>
      </div>

      {/* filter menu */}
      <AnimatePresence mode="wait">
        {isFilterOpen && (
          <motion.div
            layout="position"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-[#131313] h-full w-full max-w-2xl rounded-lg flex flex-col flex-start border border-white/10">
              <div className="p-6">
                <h2 className="text-[12px] font-bold text-gray-500 leading-tight uppercase tracking-widest ">
                  Content Type
                </h2>
                <div className="mt-2 flex gap-2 items-center">
                  {["all", "movie", "tv"].map((item) => (
                    <button
                      onClick={() => setContentType(item)}
                      className={`text-[12px] font-bold border border-white/10 hover:border-white/20  py-1.5 px-2.5 capitalize rounded-lg tracking-wide shadow-2xl ${contentType === item ? "bg-red-600 text-white" : "hover:text-white text-gray-400"} `}
                    >
                      {item === "tv"
                        ? "Series"
                        : item === "movie"
                          ? "movies"
                          : "all"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 items-center pt-3 mb-4">
        <span className="h-6 w-1 bg-red-600 rounded-lg"></span>
        <h2 className="text-white font-bold text-lg">Trending This Week</h2>
      </div>

      {/* skeleton loading and content grid */}
      {isLoading ? (
        <div className="grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          <SkeletonCard />
        </div>
      ) : (
        <div className="grow">
          <ContentGrid data={SearchResults} />
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

export default SearchPage;
