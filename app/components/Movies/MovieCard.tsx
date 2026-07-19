import type { MovieData } from "~/types";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router";

function MovieCard({ movie, type }: { movie: MovieData; type: string }) {
  const image_url = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  const rating = Number(Number(movie.vote_average).toFixed(1));
  let ratingColor = "";
  if (rating >= 7) {
    ratingColor = "text-green-400";
  } else if (rating >= 5) {
    ratingColor = "text-yellow-400";
  } else {
    ratingColor = "text-red-400";
  }

  const mediaType =
    movie.media_type?.charAt(0).toUpperCase() + movie.media_type?.slice(1);

  // dynamically sending user to the details page of movies or series
  if (mediaType === "TV Show") {
    var type = "tv";
  } else {
    var type = "movie";
  }
  return (
    <>
      <Link to={`/${type}/${movie.id}`}>
        <div className="relative w-45 rounded-lg border border-white/10 hover:scale-[1.05] duration-400 ease-in-out">
          {/* movie tag */}
          <div className="top-2 left-2 absolute px-1.5 py-0.75 text-[9px] font-extrabold shadow rounded-xs uppercase bg-red-600 text-white tracking-widest">
            {mediaType === "TV Show" ? "series" : "movie"}
          </div>

          {/* rating tag */}
          <div
            className={`top-2 right-2 absolute flex items-center gap-1 px-1.25 py-0.75 text-[11px] font-bold shadow-2xl rounded uppercase bg-slate-900/90 ${ratingColor} tracking-wider`}
          >
            <IoMdStar />
            {Number(movie.vote_average).toFixed(1)}
          </div>

          {/* data container*/}
          <img
            src={image_url}
            alt={movie.title}
            className="h-70 w-full object-fill rounded-t-lg"
          />
          {/* description container */}
          <div className="px-2.5 pt-2 pb-3">
            <h2 className="text-white font-semibold text-sm line-clamp-1">
              {movie.title}
            </h2>
            <p className="text-xs text-gray-500">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}{" "}
              {"• "}
              {mediaType.length > 1 ? mediaType : "Movie"}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
