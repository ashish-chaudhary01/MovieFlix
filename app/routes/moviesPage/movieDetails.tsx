import { Link, useLocation, useParams } from "react-router";
import { fetchMovieDetails } from "~/services/api";
import { useQuery } from "@tanstack/react-query";
import { FaRegCalendarAlt } from "react-icons/fa";
import { WiTime3 } from "react-icons/wi";
import { FaArrowLeft } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import CastRow from "~/components/CastRow";

function MovieDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const routeId =
    params.id ?? location.pathname.split("/").filter(Boolean).pop();
  const movieId = routeId ? String(routeId) : undefined;

  // taking out the path from which the user came from
  const state = (location.state as { from?: string } | null) ?? null;
  const from = state?.from ?? "/";

  // query movie details
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

  //iamges url
  const image_url = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
  const poster_url = `https://image.tmdb.org/t/p/original${movie?.poster_path}`;

  // loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="red" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white">
        {error instanceof Error
          ? error.message
          : "Failed to load movie details"}
      </div>
    );
  }

  if (!movie) {
    return <div className="text-white">No movie details found.</div>;
  }

  // movies hours and minutes
  const movieTime = Number(movie.runtime);
  const hours = Math.floor(movieTime / 60);
  const minutes = movieTime % 60;

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* background image container */}
      <div className="relative pt-32 pb-20 w-full min-h-[70vh]">
        <div className="absolute overflow-hidden z-0 inset-0">
          <img
            src={image_url}
            alt={movie.title}
            className="absolute w-full h-full object-cover"
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
          <img
            src={poster_url}
            alt={movie.title}
            className="hidden md:block w-48 h-75 lg:w-64 lg:h-90 z-10 rounded-2xl shrink-0 object-fill border border-white/10"
          />
          <div className="max-w-3xl flex-1">
            <p className="uppercase text-xs md:text-sm text-red-400 mb-1 font-bold drop-shadow-md">
              {movie.tagline}
            </p>
            <h1 className="text-4xl drop-shadow-2xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-2">
              {movie.title}
            </h1>
            {/* release year timing and rating container */}
            <div className="flex flex-wrap items-center gap-4 text-sx font-medium text-gray-300 drop-shadow-md mb-4">
              <span className="flex gap-1.5 items-center">
                <FaRegCalendarAlt size={13} />{" "}
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex gap-1.5 items-center">
                <WiTime3 size={18} /> {`${hours}h ${minutes}m`}
              </span>
              <span className="flex gap-1.5 items-center">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </span>
            </div>
            {/* genres container*/}
            <div className="flex flex-wrap gap-4 mb-4">
              {movie.genres.map(
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
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* trailers , cast cards and related contentcards */}
      {movie.trailer && (
        <div className="pt-8 pb-10 px-8 sm:px-12 md:px-14 lg:px-16 w-full flex justify-center items-center">
          <iframe
            className="aspect-video rounded-2xl shadow-2xl border-2 border-white/10"
            src={`https://www.youtube.com/embed/${movie.trailer.key}`}
            allowFullScreen
            title={movie.trailer.name}
          />
        </div>
      )}
      {/* cast row */}
      {movie.cast && <CastRow data={movie.cast} />}
    </div>
  );
}

export default MovieDetailsPage;
