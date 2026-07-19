import { BiMoviePlay } from "react-icons/bi";
import ContentGrid from "~/components/ContentGrid";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingThisWeekMovies } from "~/services/api";
import { useEffect, useState } from "react";
import type { MovieData } from "~/types";
import { ClipLoader } from "react-spinners";

function MoviesPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieData[]>([]);

  // trending movies this week query
  const { data: trendingMoviesThisWeek = [], isLoading } = useQuery({
    queryKey: ["trendingThisWeek-movies", page],
    queryFn: () => fetchTrendingThisWeekMovies(page),
  });

  // storing existing data ids and filtering out the unique data from the next page
  //  means if next page contains some data wwhich is already present in previous page it will be filterred out
  useEffect(() => {
    if (trendingMoviesThisWeek.length > 0) {
      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newItems = trendingMoviesThisWeek.filter(
          (m: MovieData) => !existingIds.has(m.id),
        );
        if (newItems.length === 0) return prev;
        return [...prev, ...newItems];
      });
    }
  }, [trendingMoviesThisWeek]);

  //scroll function for inifinite scroll triggers when the user scrolls in y direction
  // increasing page state here for the next page data
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY + 100 >
      document.body.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // windows event listner for hitting the api for the new response when user scrolls down to the bottom
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {/* content grid */}
      <div className="grow">
        <ContentGrid data={movies} />
      </div>
      {/* loader */}
      {isLoading && (
        <div className="flex items-center justify-center pt-5 ">
          <ClipLoader className="font-bold" color="red" />
        </div>
      )}
    </div>
  );
}

export default MoviesPage;
