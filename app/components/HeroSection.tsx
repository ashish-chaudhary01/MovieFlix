import { useState, useEffect } from "react";
import type { MovieData } from "~/types";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchGenresList } from "~/services/api";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router";
import { FaRegBookmark } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useWatchList } from "~/context/WatchlistContext";
import { MdBookmarkAdded } from "react-icons/md";

function HeroSection({ movies }: { movies: MovieData[] }) {
  const herMovies = movies.slice(0, 8); //selecting trending 8 movies for hero section
  const [currentIndex, setCurrentIndex] = useState(0);

  // chaning hero section after every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % herMovies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [herMovies.length, currentIndex]);

  //movie at current index
  const movie = herMovies[currentIndex];
  if (!movie) return null;
  const image_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  // genres query
  const { data: genresList } = useQuery({
    queryKey: ["genres-list"],
    queryFn: () => fetchGenresList(),
  });

  const genreNames = genresList
    ? movie.genre_ids.map((id) => {
        return genresList.find(
          (genre: { id: string | number; name: string }) =>
            String(genre.id) === String(id),
        )?.name;
      })
    : [];

  // goto slides function
  const goToSlide = (slideIdx: number) => {
    setCurrentIndex(slideIdx);
  };

  //global context
  const { watchList, setWatchList } = useWatchList();
  const isInWatchlist = watchList.some((item) => item.id === movie.id);

  // handleclick function to add or remove from watchlist
  const handleClick = () => {
    setWatchList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [movie, ...prev];
    });
  };

  return (
    <section
      key={currentIndex}
      className="animate-[fadeIn_0.5s_ease_both] relative h-[80vh] md:h-screen overflow-hidden shadow-inner shadow-4xl select-none"
    >
      <img
        src={image_url}
        alt="image"
        className="absolute inset-0 h-full object-cover w-full "
      />

      {/* overlay divs */}

      <div className="absolute inset-0 z-10 bg-linear-to-t from-[#0a0c12] via-transparent to-black/30"></div>
      <div className="absolute inset-0 z-10 bg-linear-to-r from-[#0a0c12] via-transparent to-black/30"></div>

      {/* slides dots */}
      <div className="z-20 absolute bottom-5 right-0 left-0 flex justify-center items-center gap-2 p-2">
        {herMovies.map((item, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`text-xl ${currentIndex === idx ? "text-red-500" : "text-white"} cursor-pointer `}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>

      {/* content */}

      <div className="relative z-10 h-full px-8 md:px-20 py-20 shadow-inner max-w-2xl flex flex-col justify-end md:justify-center">
        <div className="flex gap-2 items-center mb-3">
          <p className="text-xs rounded-full px-4 py-1 uppercase border border-red-500 font-bold tracking-[0.2em] text-red-400 bg-red-600/20">
            trending
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-3">
          {movie.title}
        </h2>
        {/* relaese date and genres and rating */}
        <div className="flex flex-wrap items-center gap-3 text-[14px] text-gray-300 drop-shadow-md mb-4">
          <span className="flex gap-1.5 items-center font-semibold">
            ⭐ {Number(movie.vote_average).toFixed(1)}
          </span>
          <span className="flex gap-1.5 items-center">
            <FaRegCalendarAlt size={13} />{" "}
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
          <div className="flex flex-wrap gap-2">
            {genreNames.map((genre, idx) => (
              <span
                key={idx}
                className="text-xs text-gray-200 font-semibold bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 border border-white/10 backdrop-blur-sm shadow transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        {/* overview */}
        <p className="text-gray-300 text-md hidden md:block">
          {movie.overview}
        </p>
        <div className="mt-8 flex gap-2 items-center">
          <button className="py-2 px-8 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 border-2 border-red-500 shadow-lg">
            <Link to={`/movie/${movie.id}`} className="flex items-center gap-2">
              <FaPlay size={18} />
              <span>Watch</span>
            </Link>
          </button>
          <button
            type="button"
            onClick={handleClick}
            className={`group py-2 px-8 rounded-lg backdrop-blur-md text-white font-bold border-2 border-white/10  ${isInWatchlist ? "bg-red-500 hover:bg-red-600" : "bg-white/10 hover:bg-white/20"} shadow-lg duration-300`}
          >
            <span className="flex items-center gap-2">
              {isInWatchlist ? (
                <>
                  <MdBookmarkAdded size={20} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FaRegBookmark size={20} />
                  <span>WatchList</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
