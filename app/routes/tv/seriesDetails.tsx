import { Link, useLocation, useParams } from "react-router";
import { fetchSeriesDetails } from "~/services/api";
import { useQuery } from "@tanstack/react-query";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import CastRow from "~/components/CastRow";
import { motion } from "motion/react";
import { useWatchList } from "~/context/WatchlistContext";
import { MdBookmarkAdded } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import { DetailsSkeleton } from "~/components/SkeletonCard";
import ContentRow from "~/components/ContentRow";

function SeriesDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const routeId =
    params.id ?? location.pathname.split("/").filter(Boolean).pop();
  const seriesId = routeId ? String(routeId) : undefined;

  // taking out the path from which the user came from
  const state = (location.state as { from?: string } | null) ?? null;
  const from = state?.from ?? "/";

  // for multiple server support
  const [activeServer, setActiveServer] = useState<string>("vidnest");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [imageLoaded, setImageLoaded] = useState({
    poster: false,
    backdrop: false,
  });

  // query series details
  const {
    data: series,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["series-details", seriesId],
    queryFn: () => fetchSeriesDetails(seriesId),
    enabled: Boolean(seriesId),
  });

  //watchlist context
  const { watchList, setWatchList } = useWatchList();

  //checking if the movie is already in watchlist or not
  const isInWatchlist = watchList.some((item) => item.id === series?.id);

  //iamges url
  const image_url = `https://image.tmdb.org/t/p/original${series?.backdrop_path}`;
  const poster_url = `https://image.tmdb.org/t/p/w342${series?.poster_path}`;

  //servers for movie and tv shows streaming
  const serverUrls: Record<string, string> = {
    vidnest: `https://vidnest.fun/tv/${series?.id}/${season}/${episode}`,
  };

  // handleClick function to add in watchlist or remove from watchlist
  const handleClick = () => {
    if (!series) return;
    setWatchList((prev) => {
      if (isInWatchlist) {
        return watchList.filter((item) => item.id !== series?.id);
      }
      return [series, ...prev];
    });
  };

  // loading and error states
  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-white">
        {error instanceof Error
          ? error.message
          : "Failed to load series details"}
      </div>
    );
  }

  if (!series) {
    return <div className="text-white">No series details found.</div>;
  }

  // seasons of the tv shows
  const seasons = series.seasons as {
    season_number: number;
    name: string;
    episode_count: number;
  }[];

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* background image container */}
      <div className="relative pt-32 pb-20 w-full min-h-[70vh]">
        <div className="absolute overflow-hidden z-0 inset-0">
          {/* backdrop image skeleton until it is not fully loaded */}
          {!imageLoaded.backdrop && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
          )}
          <img
            src={image_url}
            alt={series.name}
            onLoad={() =>
              setImageLoaded((prev) => ({ ...prev, backdrop: true }))
            }
            className={`absolute w-full h-full object-cover transition-opacity duration-400 ${imageLoaded.backdrop ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#07080a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#07080a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#07080a]/90"></div>
        </div>
        {/* back button */}
        <div className="absolute z-100 top-0 left-0 right-0 pt-10 pl-5 md:pl-15 pb-5">
          <Link
            className="group rounded-full px-6 py-2.5 bg-black/55 border border-white/20 text-sm font-semibold text-gray-200 inline-flex gap-2 items-center shadow-sm hover:shadow-md"
            to={from}
          >
            <FaArrowLeft
              size={15}
              className="transform group-hover:-translate-x-1.5 duration-300 drop-shadow-md"
            />
            Back
          </Link>
        </div>

        {/* movie description */}
        <div className="relative z-50 h-full flex flex-col md:flex-row py-20 items-end gap-8 px-6 md:px-12 lg:px-16">
          {/* poster image */}
          <div className="relative hidden md:block w-48 h-80 lg:w-64 lg:h-90 z-10 rounded-2xl shrink-0 border border-white/10">
            {/* skeleton of poster image */}
            {!imageLoaded.poster && (
              <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-2xl" />
            )}
            <img
              src={poster_url}
              alt={series.name}
              onLoad={() =>
                setImageLoaded((prev) => ({ ...prev, poster: true }))
              }
              className={`h-full w-full rounded-2xl transition-opacity object-cover duration-400 ${imageLoaded.poster ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          {/* right container */}
          <div className="max-w-3xl flex-1">
            <p className="uppercase text-xs md:text-sm text-red-400 mb-1 font-bold drop-shadow-md">
              {series.tagline}
            </p>
            <h1 className="text-4xl drop-shadow-2xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-2">
              {series.name}
            </h1>
            {/* release year timing and rating container */}
            <div className="flex flex-wrap items-center gap-4 text-sx font-medium text-gray-300 drop-shadow-md mb-4">
              <span className="flex gap-1.5 items-center">
                <FaRegCalendarAlt size={13} />{" "}
                {new Date(series.first_air_date).getFullYear()}
              </span>
              {/* <span className="flex gap-1.5 items-center">
                <WiTime3 size={18} /> {`${hours}h ${minutes}m`}
              </span> */}
              <span className="flex gap-1.5 items-center">
                ⭐ {Number(series.vote_average).toFixed(1)}
              </span>
            </div>
            {/* genres container*/}
            <div className="flex flex-wrap gap-4 mb-4">
              {series.genres.map(
                (genre: { id: string; name: string }, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-200 font-semibold bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 border border-white/10 backdrop-blur-sm shadow transition-colors"
                  >
                    {genre.name}
                  </span>
                ),
              )}
            </div>
            {/* movie overview */}
            <p className="text-gray-300/90 md:text-lg max-w-2xl drop-shadow-md leading-relaxed">
              {series.overview}
            </p>
            {/* watchlist button */}
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

      {/*  Streaming Player Section with Server Tabs */}
      <div className="relative px-6 sm:px-14 lg:px-16 py-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4 bg-black/40 p-2 rounded-xl border border-white/5">
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

        {/* season and episode */}
        <div className="flex gap-2 mt-4 p-2">
          <div>
            <select
              name="Season"
              id="Season"
              value={season}
              onChange={(e) => {
                setSeason(Number(e.target.value));
                setEpisode(1);
              }}
              className="text-white bg-red-500 outline-none border-none px-1.5 py-0.75 font-semibold target:bg-black"
            >
              {seasons.map((s) => (
                <option
                  key={s.season_number}
                  value={s.season_number}
                  className="bg-black text-white"
                >
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="Episodes"
              id="Episodes"
              value={episode}
              onChange={(e) => setEpisode(Number(e.target.value))}
              className="text-white bg-red-500 outline-none border-none px-1.5 py-0.75 font-semibold target:bg-black"
            >
              {Array.from(
                {
                  length:
                    seasons.find((s) => s.season_number === season)
                      ?.episode_count || 0,
                },
                (_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                    className="bg-black text-white"
                  >
                    Episode {i + 1}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
      </div>

      {/* cast row */}
      {series.cast && <CastRow data={series.cast} />}

      {/* recommended series */}
      {series?.recommendations && (
        <ContentRow
          title="Recommended Series"
          media={series.recommendations}
          type="Series"
          link="/tv"
        />
      )}
    </div>
  );
}

export default SeriesDetailsPage;
