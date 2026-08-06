import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router";
import ContentGrid from "~/components/ContentGrid";
import { CastPageSkeleton } from "~/components/SkeletonCard";
import { fetchCastDetails } from "~/services/api";

function CastPage() {
  const { id } = useParams(); //cast id
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  // for back button
  const state = (location.state as { from?: string | null }) ?? null;
  const from = state?.from ?? "/";

  const {
    data: cast,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cast-detail", id],
    queryFn: () => fetchCastDetails(id as string),
    enabled: Boolean(id),
  });

  const image_url = cast?.castDetails.profile_path
    ? `https://image.tmdb.org/t/p/w780${cast.castDetails.profile_path}`
    : "/no-image.jpg";

  if (isLoading) {
    return <CastPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto mt-20 px-4 py-10 text-center">
        <h2 className="text-4xl font-bold text-white drop-shadow-2xl">Error</h2>
        <p className="mt-2 text-sm text-gray-200">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen md:pl-10">
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

      {/* cast hero section */}
      <div className="min-h-screen flex flex-col md:flex-row gap-6 pt-20">
        {/* left container */}
        <div className="flex pt-10 justify-center">
          {/* image container */}
          <div className="relative h-100 sm:h-120 w-65 sm:w-75 rounded-2xl">
            {/* cast image skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-2xl" />
            )}
            <img
              src={image_url}
              alt={cast?.castDetails.name}
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover rounded-2xl transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>
        {/* right container */}
        <div className="flex-1 max-w-3xl px-6 py-2">
          {/* name */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {cast?.castDetails.name}
          </h2>
          {/* birthdate,birthplace,department */}
          <div className="flex flex-wrap gap-3 items-center mt-4">
            <span className="px-3 py-1.5 border border-white/20 bg-red-600 text-white font-semibold text-sm rounded-full">
              {cast?.castDetails.known_for_department}
            </span>
            <span className="px-3 py-1.5 border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-2xl text-gray-200 font-semibold text-sm rounded-full">
              {cast?.castDetails.birthday || "N/A"}
            </span>
            <span className="px-3 py-1.5 border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-2xl text-gray-200 font-semibold text-sm rounded-full">
              {cast?.castDetails.place_of_birth || "N/A"}
            </span>
          </div>
          {/* biograpgy container */}
          <div className="mt-4">
            {/* title */}
            <h2 className="flex gap-2 items-center font-bold mb-3">
              <span className="h-6 w-2 rounded-full bg-red-600" />
              <span className="text-xl text-white">Biography</span>
            </h2>
            {/* biography content */}
            <p className="text-md text-gray-200 font-semibold">
              {cast?.castDetails.biography || "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* known for */}
      <div className="pt-10 px-4 sm:pl-0 sm:pr-4 pb-10">
        <h2 className="text-3xl mb-4 flex gap-2 items-center">
          <span className="h-6 w-2 rounded-full bg-red-600" />
          <span className="text-white font-bold drop-shadow-xl">Known For</span>
        </h2>
        {/* media container */}
        <ContentGrid data={cast?.castCombinedCredits.cast} />
      </div>
    </div>
  );
}

export default CastPage;
