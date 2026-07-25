import type { Media } from "~/types";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router";
import { motion } from "motion/react";

function ContentRowCard({ media, type }: { media: Media; type: string }) {
  const image_url = `https://image.tmdb.org/t/p/original${media.poster_path}`;

  const rating = Number(Number(media.vote_average).toFixed(1));
  let ratingColor = "";
  if (rating >= 7) {
    ratingColor = "text-green-400";
  } else if (rating >= 5) {
    ratingColor = "text-yellow-400";
  } else {
    ratingColor = "text-red-400";
  }

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
      <Link to={`/${redirect}/${media.id}/${slug}`}>
        <motion.div
          whileHover={{ scale: 1.05, border: "1.5px solid gray", opacity: 0.8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="relative w-45 rounded-lg border border-white/10"
        >
          {/* movie tag */}
          <div className="top-2 left-2 absolute px-1.5 py-0.75 text-[9px] font-extrabold shadow rounded-xs uppercase bg-red-600 text-white tracking-widest">
            {type}
          </div>

          {/* rating tag */}
          <div
            className={`top-2 right-2 absolute flex items-center gap-1 px-1.25 py-0.75 text-[11px] font-bold shadow-2xl rounded uppercase bg-slate-900/90 ${ratingColor} tracking-wider`}
          >
            <IoMdStar />
            {Number(media.vote_average).toFixed(1)}
          </div>

          {/* data container*/}
          <img
            src={image_url}
            alt={media.title}
            className="h-70 w-full object-fill rounded-t-lg"
          />
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
