import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingMovies,
  fetchTrendingThisWeekMovies,
  fetchTopRatedMovies,
  fetchNowPlayingInTheatersMovies,
  fetchTrendingTvShows,
  fetchAsianTvShows,
} from "~/services/api";
import HeroSection from "~/components/HeroSection";
import ContentRow from "~/components/ContentRow";

function HomePage() {
  // trending movies query
  const {
    data: TrendingMovies = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchTrendingMovies(),
  });

  // trending movies this week query
  const {
    data: trendingMoviesThisWeekData,
    isError: isTrendingThisWeekError,
    error: trendingThisWeekError,
  } = useQuery({
    queryKey: ["trending-this-week-home"],
    queryFn: () => fetchTrendingThisWeekMovies(1),
  });

  const trendingThisWeekMovies = trendingMoviesThisWeekData?.results ?? [];

  // top-rated movies query
  const { data: TopRatedMovies = [] } = useQuery({
    queryKey: ["topRated-movies"],
    queryFn: () => fetchTopRatedMovies(),
  });

  // Now Playing in theater movies query
  const { data: nowPlaying = [] } = useQuery({
    queryKey: ["nowPlaying-movies"],
    queryFn: () => fetchNowPlayingInTheatersMovies(),
  });

  // trending tv shows query
  const { data: trendingTvShows } = useQuery({
    queryKey: ["trending-tvShows"],
    queryFn: () => fetchTrendingTvShows(1),
  });

  const trendingThisWeekTvShows = trendingTvShows?.results ?? [];

  // asian tv shows query
  const { data: asianTvShows = [] } = useQuery({
    queryKey: ["asiantvShows"],
    queryFn: () => fetchAsianTvShows(),
  });

  if (isTrendingThisWeekError) {
    return <p>{trendingThisWeekError.message}</p>;
  }

  // error
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <HeroSection movies={TrendingMovies} />
      <ContentRow
        type="Movie"
        title="Trending Movies"
        media={TrendingMovies}
        link="/movies"
      />
      <ContentRow
        type="Movie"
        title="Top 20 Movies This Week"
        media={trendingThisWeekMovies}
        link="/movies"
      />
      <ContentRow
        type="Movie"
        title="Top Rated Movies"
        media={TopRatedMovies}
        link="/movies"
      />
      <ContentRow
        type="Movie"
        title="Now Playing In Theater"
        media={nowPlaying}
        link="/movies"
      />
      <div className="text-center text-xs text-gray-500 font-bold flex items-center justify-between">
        <div className="flex-1 h-px bg-white/20 ml-10"></div>
        <p className="px-3">TV SHOWS</p>
        <div className="flex-1 h-px bg-white/20 mr-10"></div>
      </div>
      <ContentRow
        type="Series"
        title="Asian TV Shows"
        media={asianTvShows}
        link="/tv"
      />
      <ContentRow
        type="Series"
        title="Trending TV Shows"
        media={trendingThisWeekTvShows}
        link="/tv"
      />
    </>
  );
}

export default HomePage;
