import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ContentGrid from "~/components/ContentGrid";
import { fetchAllTrending, fetchSearchResults } from "~/services/api";
import type { MovieData } from "~/types";
import { ClipLoader } from "react-spinners";

function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<MovieData[]>([]);
  const [page, setPage] = useState(1);

  // reseting all states on every search
  useEffect(() => {
    setResults([]);
    setPage(1);
  }, [search]);

  // query
  const { data = [], isLoading } = useQuery({
    queryKey: ["trendingAll", page, search],
    queryFn: () => {
      if (search.trim() === "") {
        return fetchAllTrending(page);
      } else {
        return fetchSearchResults(search, page);
      }
    },
  });

  // storing existing data ids and filtering out the unique data from the next page
  //  means if next page contains some data wwhich is already present in previous page it will be filterred out
  useEffect(() => {
    if (data.length > 0) {
      setResults((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newItems = data.filter((m: MovieData) => !existingIds.has(m.id));
        if (newItems.length === 0) return prev;
        return [...prev, ...newItems];
      });
    }
  }, [data]);

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
    <div className="min-h-screen p-4 sm:p-6 text-white bg-">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      {/* search section  */}
      <div className="max-w-3xl flex gap-3 shadow-2xl mb-6">
        <input
          type="text"
          placeholder="Search movies and series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="relative rounded-2xl flex-1 px-6 py-3.5 text-sm placeholder:text-gray-500 text-gray-200 outline-none border-2 border-white/10 focus:border-red-500/90 shadow-inner"
        />
        {/* filter button and menu here */}
        {/* <button className="py-3.5 px-4 rounded-2xl text-sm text-white border border-white/20 hover:border-white/30 font-bold tracking-wider">
          Filters
        </button> */}
      </div>
      {/* movies cards lists */}
      <ContentGrid data={results} />
      {/* loader */}
      {isLoading && (
        <div className="flex items-center justify-center pt-5 ">
          <ClipLoader className="font-bold" color="red" />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
