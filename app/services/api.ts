const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
import type {
  CastData,
  genreData,
  MovieData,
  MovieDetails,
  SeriesDetails,
  Trailer,
  TvShowsData,
} from "~/types";

//trending movies
export async function fetchTrendingMovies() {
  const res = await fetch(`${API_URL}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const trending = data.results.map((movie: MovieData) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    media_type: movie.media_type,
  }));

  return trending;
}

// top 20 trending movies this week
export async function fetchTrendingThisWeekMovies(page: number) {
  const res = await fetch(
    `${API_URL}/trending/movie/week?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const trendingMovieThisWeek = data.results.map((movie: MovieData) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    media_type: movie.media_type,
  }));

  return trendingMovieThisWeek;
}

// top-rated movies
export async function fetchTopRatedMovies() {
  const res = await fetch(`${API_URL}/movie/top_rated`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const topRated = data.results.map((movie: MovieData) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    media_type: movie.media_type,
  }));

  return topRated;
}

// now playing in theaters
export async function fetchNowPlayingInTheatersMovies() {
  const res = await fetch(
    `${API_URL}/movie/now_playing?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const nowPlaying = data.results.map((movie: MovieData) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    media_type: movie.media_type,
  }));

  return nowPlaying;
}

// trending tv shows
export async function fetchTrendingTvShows(page: number) {
  const res = await fetch(
    `${API_URL}/trending/tv/day?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const trendingTvShows = data.results.map((movie: TvShowsData) => ({
    id: movie.id,
    title: movie.name,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.first_air_date,
    genre_ids: movie.genre_ids,
    media_type: "TV Show",
  }));

  return trendingTvShows;
}

// asian tv shows
// you can change country to get shows of a particular country such as JP for japan tv shows etc...
export async function fetchAsianTvShows() {
  const res = await fetch(
    `${API_URL}/discover/tv?with_origin_country=KR&sort_by=popularity.desc`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Movies");

  const data = await res.json();
  const asianTvShows = data.results.map((movie: TvShowsData) => ({
    id: movie.id,
    title: movie.name,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    release_date: movie.first_air_date,
    genre_ids: movie.genre_ids,
    media_type: "TV Show",
  }));

  return asianTvShows;
}

// movie details
export async function fetchMovieDetails(id?: string) {
  if (!id) throw new Error("Movie id is missing");

  const res = await fetch(
    `${API_URL}/movie/${id}?append_to_response=videos,credits`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Movie details");

  const data = await res.json();
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

// genres list
export async function fetchGenresList(id?: string) {
  const res = await fetch(`${API_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed To fetch genres list");

  const data = await res.json();
  const genres = data.genres.map((genre: genreData) => ({
    id: genre.id,
    name: genre.name,
  }));

  return genres;
}

// all trending movies or series for search page
export async function fetchAllTrending(page: number) {
  const res = await fetch(
    `${API_URL}/trending/all/day?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch trending movies and tv shows");

  const data = await res.json();
  const trendingAll = data.results.map((a: MovieData) => ({
    id: a.id,
    title: a.title,
    name: a.name,
    poster_path: a.poster_path,
    backdrop_path: a.backdrop_path,
    vote_average: a.vote_average,
    overview: a.overview,
    release_date: a.release_date,
    first_air_date: a.first_air_date,
    genre_ids: a.genre_ids,
    media_type: a.media_type,
  }));

  return trendingAll;
}

// search movies or tv shows
export async function fetchSearchResults(query: string, page: number) {
  const res = await fetch(
    `${API_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch trending movies and tv shows");

  const data = await res.json();
  const searchData = data.results.map((a: MovieData) => ({
    id: a.id,
    title: a.title,
    name: a.name,
    poster_path: a.poster_path,
    backdrop_path: a.backdrop_path,
    vote_average: a.vote_average,
    overview: a.overview,
    release_date: a.release_date,
    first_air_date: a.first_air_date,
    genre_ids: a.genre_ids,
    media_type: a.media_type,
  }));

  return searchData;
}

// series details
export async function fetchSeriesDetails(id?: string) {
  if (!id) throw new Error("series id is missing");

  const res = await fetch(
    `${API_URL}/tv/${id}?append_to_response=videos,credits`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) throw new Error("Failed To fetch Series details");

  const data = await res.json();

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

// details of series season and its episodes
// use if you want to show the episodes details
// export async function fetchSeasonDetails(
//   id?: string,
//   seasonNumber?: string | number,
// ) {
//   if (!id) throw new Error("series id is missing");

//   const res = await fetch(`${API_URL}/tv/${id}/season/${seasonNumber}`, {
//     headers: {
//       Authorization: `Bearer ${API_TOKEN}`,
//       Accept: "application/json",
//     },
//   });

//   if (!res.ok) throw new Error("Failed To fetch Series details");

//   const data = await res.json();

//   return data.episodes;
// }
