import { Link } from "react-router";
import { IoMdStar } from "react-icons/io";
import type { Media } from "~/types";
import { useLocation } from "react-router";
import { motion } from "motion/react";

function ContentCard({ data }: { data: Media }) {
  // using for dynamically sending the path to the content cards for back button
  const location = useLocation();

  // images url if they dont have image.poster_path then use backdrop_path
  const image_url = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const image_url2 = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;

  // rating colors
  const rating = Number(Number(data.vote_average).toFixed(1));
  const ratingColor =
    rating >= 7
      ? "text-green-400"
      : rating >= 5
        ? "text-yellow-400"
        : "text-red-400";

  const releaseDate =
    "release_date" in data && data.release_date !== undefined
      ? data.release_date
      : data.first_air_date;

  // dynamically sending user to the details page of movies or series
  const type = data.media_type === "movie" ? "movie" : "tv";

  // slug for the url
  const slug = data.title
    ? data.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    : data.name
      ? data.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
      : "/";

  return (
    <>
      <Link
        to={`/${type}/${data.id}/${slug}`}
        state={{ from: location.pathname }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          whileHover={{
            scale: 1.05,
            opacity: 0.8,
            boxShadow: "0 0 25px rgba(255,255,255,.15)",
          }}

          className="relative w-full h-full rounded-2xl border overflow-hidden shadow-[1px_1px_5px_rgba(0,0,0,0.3)] border-white/20"
        >
          {/* movie tag */}
          <div className="top-2 left-2 absolute px-1.5 py-0.75 text-[9px] font-extrabold shadow rounded-xs uppercase bg-red-600 text-white tracking-widest">
            {type === "tv" ? "series" : "movie"}
          </div>

          {/* rating tag */}
          <div
            className={`top-2 right-2 absolute flex items-center gap-1 px-1.25 py-0.75 text-[9px] sm:text-[11px] font-extrabold shadow-2xl rounded uppercase bg-slate-900/90 ${ratingColor} tracking-wider`}
          >
            <IoMdStar />
            {Number(data.vote_average).toFixed(1)}
          </div>

          {/* data container*/}
          {/* aspect 2/3 makes image responsive */}
          <div className="w-full aspect-2/3">
            <img
              loading="lazy"
              decoding="async"
              src={image_url ? image_url : image_url2}
              alt={data.title || data.name}
              className="h-full w-full object-cover rounded-t-lg"
            />
          </div>
          {/* description container */}
          <div className="px-2.5 pt-2 pb-3">
            <h2 className="text-white font-semibold text-sm line-clamp-1">
              {data.title || data.name}
            </h2>
            <p className="text-xs text-gray-500 capitalize">
              {releaseDate ? new Date(releaseDate).getFullYear() : ""} {"• "}
              {data.media_type && data.media_type === "tv" ? "series" : "movie"}
            </p>
          </div>
        </motion.div>
      </Link>
    </>
  );
}

export default ContentCard;
