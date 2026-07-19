import { useRef } from "react";
import { Link } from "react-router";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import type { CastData } from "~/types";
import CastCard from "./CastCard";

function CastRow({ data }: { data: CastData[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  //scroll right
  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  // scroll left
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-primary text-lg md:text-xl font-bold px-3 tracking-wide leading-tight border-l-4 py-1 border-red-500 ">
          Top Cast
        </h2>

        <div className="flex gap-1 items-center md:mr-4">
          {/* left scroll button */}
          <button
            onClick={scrollLeft}
            className="cursor-pointer w-8 h-8 text-xl text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          {/* right scroll button */}
          <button
            onClick={scrollRight}
            className="cursor-pointer w-8 h-8 text-xl text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* cast card */}

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar gap-3 py-6 cursor-grab "
      >
        {data?.map((c: CastData) => (
          <CastCard key={c.id} data={c} />
        ))}
      </div>
    </section>
  );
}

export default CastRow;
