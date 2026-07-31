import type { Media } from "~/types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";
import { Link } from "react-router";
import ContentRowCard from "./ContentRowCard";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { RowSkeletonCard } from "./SkeletonCard";

function ContentRow({
  title,
  media,
  type,
  link,
}: {
  title: string;
  media: Media[];
  type: string;
  link: string;
}) {
  // // skeleton for homepage content rows
  // if (media.length === 0) {
  //   return (
  //     <div className="flex overflow-x-auto scroll-smooth no-scrollbar gap-3 py-6 px-2">
  //       <div className="relative w-45 h-70 animate-pulse bg-zinc-800 rounded-xl"></div>
  //     </div>
  //   );
  // }

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
    <section className="py-8 px-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-primary text-md md:text-xl font-bold px-3 tracking-wide leading-tight border-l-4 py-1 border-red-500 ml-2">
          {title}
        </h2>

        <div className="flex gap-1 items-center md:mr-4">
          <button className="text-gray-500 hover:text-white text-xs cursor-pointer font-medium mr-2 duration-300">
            <Link className="h-full w-full" to={link}>
              {" "}
              SEE ALL
            </Link>
          </button>
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

      {/* skeleton cards and content card */}
      <AnimatePresence mode="wait">
        {media.length === 0 ? (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeInOut }}
            className="flex overflow-x-auto scroll-smooth no-scrollbar gap-3 py-6 px-2"
          >
            <RowSkeletonCard />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeInOut }}
            ref={sliderRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar gap-3 py-6 px-2"
          >
            {media?.map((media: Media) => (
              <>
                <ContentRowCard key={media.id} media={media} type={type} />
              </>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ContentRow;
