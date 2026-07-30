const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
import type {
  CastData,
  Genre,
  MovieDetails,
  SeriesDetails,
  TMDBMovie,
  TMDBResponse,
  TMDBSeries,
  Trailer,
} from "~/types";
import { mapMedia } from "./mappers";

// header for api
const header = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: "application/json",
};

// helper function
async function apiFetch<T>(endpoints: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoints}`, { headers: header });
  if (!res.ok) throw new Error(`Request Failed ${res.status}`);
  return res.json() as Promise<T>;
}

//trending movies
export async function fetchTrendingMovies() {
  const data = await apiFetch<TMDBResponse>("/trending/movie/day");
  const trending = data.results.map(mapMedia);
  return trending;
}

// top 20 trending movies this week
export async function fetchTrendingThisWeekMovies(pageParam: number) {
  const data = await apiFetch<TMDBResponse>(
    `/trending/movie/week?language=en-US&page=${pageParam}`,
  );
  const trendingMovieThisWeek = data.results.map(mapMedia);
  return {
    results: trendingMovieThisWeek,
    page: data.page,
    total_pages: data.total_pages,
  };
}

// top-rated movies
export async function fetchTopRatedMovies() {
  const data = await apiFetch<TMDBResponse>("/movie/top_rated");
  const topRated = data.results.map(mapMedia);
  return topRated;
}

// now playing in theaters
export async function fetchNowPlayingInTheatersMovies() {
  const data = await apiFetch<TMDBResponse>(
    "/movie/now_playing?language=en-US&page=1",
  );
  const nowPlaying = data.results.map(mapMedia);
  return nowPlaying;
}

// trending tv shows
export async function fetchTrendingTvShows(page: number) {
  const data = await apiFetch<TMDBResponse>(
    `/trending/tv/day?language=en-US&page=${page}`,
  );
  const trendingTvShows = data.results.map(mapMedia);
  return {
    results: trendingTvShows,
    page: data.page,
    total_pages: data.total_pages,
  };
}

// asian tv shows
// you can change country to get shows of a particular country such as JP for japan tv shows etc...
export async function fetchAsianTvShows() {
  const data = await apiFetch<TMDBResponse>(
    `/discover/tv?with_origin_country=KR&sort_by=popularity.desc`,
  );
  const asianTvShows = data.results.map(mapMedia);
  return asianTvShows;
}

// movie details
export async function fetchMovieDetails(id?: string) {
  if (!id) throw new Error("Movie id is missing");
  const data = await apiFetch<TMDBMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
  // extracting trailer
  const trailer = data.videos.results.find(
    (v: Trailer) => v.type === "Trailer" && v.site === "YouTube",
  );
  // extracting cast
  const cast = data.credits.cast.map((c: CastData) => ({
    id: c.id,
    cast_id: c.cast_id,
    name: c.name,
    character: c.character,
    profile_path: c.profile_path,
    known_for_department: c.known_for_department,
  }));

  return {
    id: data.id,
    title: data.title,
    tagline: data.tagline,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average,
    overview: data.overview,
    release_date: data.release_date,
    runtime: data.runtime,
    genres: data.genres ?? [],

    trailer: trailer
      ? {
          id: trailer.id,
          key: trailer.key,
          name: trailer.name,
          site: trailer.site,
          type: trailer.type,
        }
      : null,

    cast: cast,
  } as MovieDetails;
}

// genres list for hero section
export async function fetchGenresList(id?: string) {
  const res = await fetch(`${API_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed To fetch genres list");
  const data = await res.json();
  const genres = data.genres.map((genre: Genre) => ({
    id: genre.id,
    name: genre.name,
  }));
  return genres;
}

// all trending movies or series for search page
export async function fetchAllTrending(type: string, page: number) {
  const data = await apiFetch<TMDBResponse>(
    `/trending/${type}/week?language=en-US&page=${page}`,
  );
  const trendingAll = data.results.map(mapMedia);
  return {
    results: trendingAll,
    page: data.page,
    total_pages: data.total_pages,
  };
}

// search movies or tv shows
export async function fetchSearchResults(query: string, page: number) {
  const data = await apiFetch<TMDBResponse>(
    `/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
  );
  const searchData = data.results.map(mapMedia);
  return {
    results: searchData,
    page: data.page,
    total_pages: data.total_pages,
  };
}

// series details
export async function fetchSeriesDetails(id?: string) {
  const data = await apiFetch<TMDBSeries>(
    `/tv/${id}?append_to_response=videos,credits`,
  );
  const trailer = data.videos.results.find(
    (v: Trailer) => v.type === "Trailer" && v.site === "YouTube",
  );
  const cast = data.credits.cast.map((c: CastData) => ({
    id: c.id,
    cast_id: c.cast_id,
    name: c.name,
    character: c.character,
    profile_path: c.profile_path,
    known_for_department: c.known_for_department,
  }));

  return {
    id: data.id,
    name: data.name,
    tagline: data.tagline,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average,
    overview: data.overview,
    first_air_date: data.first_air_date,
    number_of_episodes: data.number_of_episodes,
    number_of_seasons: data.number_of_seasons,
    seasons: data.seasons,
    genres: data.genres ?? [],
    trailer: trailer
      ? {
          id: trailer.id,
          key: trailer.key,
          name: trailer.name,
          site: trailer.site,
          type: trailer.type,
        }
      : null,
    cast: cast,
  } as SeriesDetails;
}
