import type { Media } from "~/types";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

function ContentRowCard({ media, type }: { media: Media; type: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const image_url = `https://image.tmdb.org/t/p/w342${media.poster_path}`;

  // rating colors
  const rating = Number(Number(media.vote_average).toFixed(1));
  const ratingColor =
    rating >= 7
      ? "text-green-400"
      : rating >= 5
        ? "text-yellow-400"
        : "text-red-400";

  // for see all movies/series
  const redirect = type === "Movie" ? "movie" : "tv";

  // slug for the url
  const slug = media.title
    ? media.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    : media.name
      ? media.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
      : "/";

  return (
    <>
      <Link
        to={`/${redirect}/${media.id}/${slug}`}
        state={{ from: location.pathname }}
      >
        <motion.div
          whileHover={{ scale: 1.05, border: "1.5px solid gray", opacity: 0.8 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-45 rounded-lg border border-white/10"
        >
          {/* movie tag */}
          <div className="top-2 left-2 absolute z-10 px-1.5 py-0.75 text-[9px] font-extrabold shadow rounded-xs uppercase bg-red-600 text-white tracking-widest">
            {type}
          </div>

          {/* rating tag */}
          <div
            className={`top-2 right-2 absolute z-10 flex items-center gap-1 px-1.25 py-0.75 text-[11px] font-bold shadow-2xl rounded uppercase bg-slate-900/90 ${ratingColor} tracking-wider`}
          >
            <IoMdStar />
            {Number(media.vote_average).toFixed(1)}
          </div>

          {/* data container*/}
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-zinc-800 rounded-t-lg animate-pulse "></div>
            )}
            <img
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              src={image_url}
              alt={media.title}
              className={`h-70 w-full object-cover rounded-t-lg transition-opacity duration-600 ${imageLoaded ? "opacity-100" : "opacity-0"} `}
            />
          </div>
          {/* description container */}
          <div className="px-2.5 pt-2 pb-3">
            <h2 className="text-white font-semibold text-sm line-clamp-1">
              {media.title || media.name}
            </h2>
            <p className="text-xs text-gray-500">
              {media.release_date
                ? new Date(media.release_date).getFullYear()
                : media.first_air_date
                  ? new Date(media.first_air_date).getFullYear()
                  : "N/A"}{" "}
              {"• "}
              {type}
            </p>
          </div>
        </motion.div>
      </Link>
    </>
  );
}

export default ContentRowCard;
