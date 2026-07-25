import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
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
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchTrendingMovies(),
  });

  // trending movies this week query
  const {
    data: trendingMoviesThisWeekData,
    isLoading: isTrendingThisWeekLoading,
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
  const { data: trendingTvShows = [] } = useQuery({
    queryKey: ["tvShows"],
    queryFn: () => fetchTrendingTvShows(1),
  });

  // asian tv shows query
  const { data: asianTvShows = [] } = useQuery({
    queryKey: ["asiantvShows"],
    queryFn: () => fetchAsianTvShows(),
  });

  // loader
  if (isLoading && TrendingMovies.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="red" />
      </div>
    );
  }
  // error
  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isTrendingThisWeekError) {
    return <p>{trendingThisWeekError.message}</p>;
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
      <ContentRow
        type="Series"
        title="Asian TV Shows"
        media={asianTvShows}
        link="/tv"
      />
      <ContentRow
        type="Series"
        title="Trending TV Shows"
        media={trendingTvShows}
        link="/tv"
      />
    </>
  );
}

export default HomePage;
