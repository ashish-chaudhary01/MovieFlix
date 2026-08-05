import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { fetchMovieDetails } from "~/services/api";
import { useQuery } from "@tanstack/react-query";
import { FaRegCalendarAlt, FaArrowLeft, FaRegBookmark } from "react-icons/fa";
import { WiTime3 } from "react-icons/wi";
import CastRow from "~/components/CastRow";
import { motion } from "motion/react";
import { useWatchList } from "~/context/WatchlistContext";
import { MdBookmarkAdded } from "react-icons/md";
import { DetailsSkeleton } from "~/components/SkeletonCard";
import ContentRow from "~/components/ContentRow";

function MovieDetailsPage() {
  const params = useParams();
  const location = useLocation();

  const routeId =
    params.id ?? location.pathname.split("/").filter(Boolean).pop();
  const movieId = routeId ? String(routeId) : undefined;

  // for back button
  const state = (location.state as { from?: string } | null) ?? null;
  const from = state?.from ?? "/";

  // for multiple server support
  const [activeServer, setActiveServer] = useState<string>("vidnest");

  //query
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: Boolean(movieId),
  });

  //watchlist context
  const { watchList, setWatchList } = useWatchList();

  //checking if the movie is already in watchlist or not
  const isInWatchlist = watchList.some((item) => item.id === movie?.id);

  //images url
  const image_url = movie
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const poster_url = movie
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "";

  // movie playtime
  const movieTime = movie ? Number(movie.runtime) : 0;
  const hours = Math.floor(movieTime / 60);
  const minutes = movieTime % 60;

  //servers for movie and tv shows streaming
  const serverUrls: Record<string, string> = {
    vidnest: `https://vidnest.fun/movie/${movie?.id}`,
  };

  // handleClick function to add in watchlist or remove from watchlist
  const handleClick = () => {
    if (!movie) return;
    setWatchList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [movie, ...prev];
    });
  };

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center text-white bg-background">
        {error instanceof Error
          ? error.message
          : "Failed to load movie details"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Background image container */}
      <div className="relative pt-32 pb-20 w-full min-h-[70vh]">
        <div className="absolute overflow-hidden z-0 inset-0">
          <img
            src={image_url}
            alt={movie?.title}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#07080a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#07080a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#07080a]/90"></div>
        </div>

        {/* back button */}
        <div className="absolute z-50 top-0 left-0 right-0 pt-10 pl-5 md:pl-15 pb-5">
          <Link
            className="group rounded-full px-6 py-2.5 bg-black/55 border border-white/20 text-sm font-semibold text-gray-200 inline-flex gap-2 items-center shadow-sm hover:shadow-md"
            to={from}
          >
            <FaArrowLeft
              size={15}
              className="transform group-hover:-translate-x-1.5 duration-300"
            />
            Back
          </Link>
        </div>

        {/* Movie Description */}
        <div className="relative z-40 h-full flex flex-col md:flex-row py-20 items-end gap-8 px-6 md:px-12 lg:px-16">
          <img
            src={poster_url}
            alt={movie?.title}
            className="hidden md:block w-48 h-75 lg:w-64 lg:h-90 rounded-2xl shrink-0 object-fill border border-white/10"
          />
          <div className="max-w-3xl flex-1">
            <p className="uppercase text-xs md:text-sm text-red-400 mb-1 font-bold">
              {movie?.tagline}
            </p>
            <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2">
              {movie?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300 mb-4">
              <span className="flex gap-1.5 items-center">
                <FaRegCalendarAlt size={13} />{" "}
                {movie ? new Date(movie?.release_date).getFullYear() : "N/A"}
              </span>
              <span className="flex gap-1.5 items-center">
                <WiTime3 size={18} /> {`${hours}h ${minutes}m`}
              </span>
              <span>⭐ {Number(movie?.vote_average).toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {movie?.genres?.map(
                (genre: { id: string; name: string }, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-200 font-semibold bg-white/10 rounded-full px-3 py-1 border border-white/10"
                  >
                    {genre.name}
                  </span>
                ),
              )}
            </div>
            <p className="text-gray-300/90 md:text-lg max-w-2xl leading-relaxed">
              {movie?.overview}
            </p>

            <motion.button
              onClick={handleClick}
              whileTap={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 py-2 px-8 rounded-lg text-white font-bold border-2 border-white/10 ${isInWatchlist ? "bg-red-500 hover:bg-red-600" : "bg-white/10 hover:bg-white/20"} cursor-pointer duration-300`}
            >
              <span className="flex items-center gap-2">
                {isInWatchlist ? (
                  <>
                    <MdBookmarkAdded size={20} /> Added
                  </>
                ) : (
                  <>
                    <FaRegBookmark size={20} /> Add To WatchList
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Streaming Player Section with Server Tabs */}
      <div className="relative px-6 sm:px-14 lg:px-16 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4 p-2 rounded-xl">
          <span className="text-gray-400 self-center mr-2 text-sm font-semibold">
            Sources:
          </span>
          {Object.keys(serverUrls).map((server) => (
            <button
              key={server}
              onClick={() => setActiveServer(server)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeServer === server
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {server.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="w-full relative aspect-video rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-black">
          <iframe
            src={serverUrls[activeServer]}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* cast  */}
      {movie?.cast && <CastRow data={movie?.cast} />}

      {/* recommended movies */}
      {movie?.recommendations && (
        <ContentRow
          title="Recommended Movies"
          media={movie.recommendations}
          type="Movie"
          link="/movies"
        />
      )}
    </div>
  );
}

export default MovieDetailsPage;
