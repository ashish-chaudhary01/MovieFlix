import { useState } from "react";
import { Link } from "react-router";
import type { CastData } from "~/types";

function CastCard({ data }: { data: CastData }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const image_url = data.profile_path
    ? `https://image.tmdb.org/t/p/w342${data.profile_path}`
    : "/no-image.jpg";

  return (
    <Link to={`/cast/${data.id}`} state={{ from: location.pathname }}>
      <div className="group relative hover:-translate-y-2.5 duration-300 ease-in-out">
        {/* image */}
        <div className="relative h-25 w-25 sm:h-40 sm:w-40 rounded-full">
          {!imageLoaded && (
            <div className="h-full w-full rounded-full bg-zinc-800 animate-pulse" />
          )}
          <img
            src={image_url}
            alt={data.name}
            onLoad={() => setImageLoaded(true)}
            onError={(e: any) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/no-image.png";
            }}
            className={`h-full w-full object-cover rounded-full transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* overlays */}
          <div className="absolute inset-0 group-hover:bg-linear-to-b from-transparent to-[#07080a]/90 duration-300"></div>
        </div>

        {/* description */}
        <div className="pt-2 text-center">
          <h2 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-red-400 duration-300">
            {data.name}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-1">{data.character}</p>
        </div>
      </div>
    </Link>
  );
}

export default CastCard;
