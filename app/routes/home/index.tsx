import MovieRow from "~/components/MovieRow";
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
  const { data: trendingMoviesThisWeek = [] } = useQuery({
    queryKey: ["trendingThisWeek-movies"],
    queryFn: () => fetchTrendingThisWeekMovies(1),
  });

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
  if (isLoading) {
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

  return (
    <>
      <HeroSection movies={TrendingMovies} />
      <MovieRow
        type="Movie"
        title="Trending Movies"
        movies={TrendingMovies}
        link="/movies"
      />
      <MovieRow
        type="Movie"
        title="Top 20 Movies This Week"
        movies={trendingMoviesThisWeek}
        link="/movies"
      />
      <MovieRow
        type="Movie"
        title="Top Rated Movies"
        movies={TopRatedMovies}
        link="/movies"
      />
      <MovieRow
        type="Movie"
        title="Now Playing In Theater"
        movies={nowPlaying}
        link="/movies"
      />
      <MovieRow
        type="Series"
        title="Asian TV Shows"
        movies={asianTvShows}
        link="/tv"
      />
      <MovieRow
        type="Series"
        title="Trending TV Shows"
        movies={trendingTvShows}
        link="/tv"
      />
    </>
  );
}

export default HomePage;
