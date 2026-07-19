import {
  useContext,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  MovieData,
  MovieDetails,
  SeriesDetails,
  TvShowsData,
} from "~/types";

export type WatchlistItem =
  MovieData | TvShowsData | MovieDetails | SeriesDetails;

type WatchlistContextType = {
  watchList: WatchlistItem[];
  setWatchList: Dispatch<SetStateAction<WatchlistItem[]>>;
};

const watchListContext = createContext<WatchlistContextType | null>(null);

function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchList, setWatchList] = useState<WatchlistItem[]>([]);

  return (
    <watchListContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </watchListContext.Provider>
  );
}

export default WatchlistProvider;

export function useWatchList() {
  const context = useContext(watchListContext);

  if (!context) {
    throw new Error("useWatchList must be used within a WatchlistProvider");
  }

  return context;
}
