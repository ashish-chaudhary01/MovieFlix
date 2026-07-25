import type { Media } from "~/types";
import ContentCard from "./ContentCard";

// the content grid can accept both types of data either movie or tv shows
function ContentGrid({ data }: { data?: Array<Media> }) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {data?.map((item, index) => (
        <ContentCard key={`${item.id}-${index}`} data={item} />
      ))}
    </div>
  );
}

export default ContentGrid;
