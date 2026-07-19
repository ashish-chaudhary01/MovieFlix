import type { CastData } from "~/types";

function CastCard({ data }: { data: CastData }) {
  const image_url = data.profile_path
    ? `https://image.tmdb.org/t/p/original${data.profile_path}`
    : "/no-image.png";

  return (
    <div className="group relative min-w-40 rounded-lg border border-white/10 hover:-translate-y-2.5 duration-300 ease-in-out">
      {/* image */}
      <div className="relative h-50">
        <img
          src={image_url}
          alt={data.name}
          onError={(e: any) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/no-image.png";
          }}
          className="h-full w-full object-cover rounded-t-lg"
        />

        {/* overlays */}
        <div className="absolute inset-0 hover:bg-linear-to-b from-transparent to-[#07080a]/90 duration-300"></div>
      </div>

      {/* description */}
      <div className="px-2.5 pt-2 pb-3">
        <h2 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-red-400 duration-300">
          {data.name}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-1">{data.character}</p>
      </div>
    </div>
  );
}

export default CastCard;
