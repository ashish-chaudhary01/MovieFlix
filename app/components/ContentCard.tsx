import { Link } from "react-router";
import { IoMdStar } from "react-icons/io";
import type { Media } from "~/types";
import { useLocation } from "react-router";
import { motion } from "motion/react";

function ContentCard({ data }: { data: Media }) {
  // using for dynamically sending the path to the content cards for back button
  const location = useLocation();

  // images url if they dont have image.poster_path then use backdrop_path
  const image_url = `https://image.tmdb.org/t/p/original${data.poster_path}`;
  const image_url2 = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

  // rating colors
  const rating = Number(Number(data.vote_average).toFixed(1));
  let ratingColor = "";
  if (rating >= 7) {
    ratingColor = "text-green-400";
  } else if (rating >= 5) {
    ratingColor = "text-yellow-400";
  } else {
    ratingColor = "text-red-400";
  }

  // some moviesData dont have media_type
  // therefore if they dont have the default type would become Movie
  // but if they have any media type(tv show or movies) it will be capitalized first and stored in mediaType varibale
  const mediaType =
    "media_type" in data && data.media_type
      ? data.media_type.charAt(0).toUpperCase() + data.media_type.slice(1)
      : "Movie";
  const title =
    "title" in data && data.title !== undefined ? data.title : data.name;
  const releaseDate =
    "release_date" in data && data.release_date !== undefined
      ? data.release_date
      : data.first_air_date;

  // dynamically sending user to the details page of movies or series
  if (mediaType === "TV Show" || mediaType === "Tv") {
    var type = "tv";
  } else {
    var type = "movie";
  }

  // slug for the url
  const slug = data.title
    ? data.title
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
          transition={{ duration: 0.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, border: "1.5px solid gray", opacity: 0.8 }}
          className="relative w-full h-full rounded-lg border overflow-hidden shadow-[1px_1px_5px_rgba(0,0,0,0.3)] border-white/10"
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
          <div className="w-full aspect-2/3">
            <img
              src={image_url ? image_url : image_url2}
              alt={title}
              className="h-full w-full object-fill rounded-t-lg"
            />
          </div>
          {/* description container */}
          <div className="px-2.5 pt-2 pb-3">
            <h2 className="text-white font-semibold text-sm line-clamp-1">
              {title}
            </h2>
            <p className="text-xs text-gray-500">
              {releaseDate ? new Date(releaseDate).getFullYear() : ""} {"• "}
              {mediaType.length > 1 ? mediaType : "Movie"}
            </p>
          </div>
        </motion.div>
      </Link>
    </>
  );
}

export default ContentCard;
