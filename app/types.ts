// only use types when you are working with typescript not javascript

// movies and series response from tmdb
// like pages of movies and series response from tmdb
export interface TMDBResponse {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

// return type for series and movies
export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type?: "movie" | "tv";
}

//tmdb movie details response type
export interface TMDBMovie {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: string;
  genres: Genre[];
  videos: { results: Trailer[] };
  credits: { cast: CastData[] };
}

// return type for movie details
export interface MovieDetails {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: string;
  genres: [];
  trailer?: Trailer;
  cast?: CastData[];
}

// seasons
type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

// tmdb series details response
export interface TMDBSeries {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Season[];
  genres: Genre[];
  videos: { results: Trailer[] };
  credits: { cast: CastData[] };
}

// return type for series details
export interface SeriesDetails {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Season[];
  genres: Genre[];
  trailer?: Trailer;
  cast?: CastData[];
}

// genre list type
export type Genre = {
  id: string;
  name: string;
};

// trailer type
export type Trailer = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

// cast data type
export type CastData = {
  id: string;
  cast_id: string;
  name: string;
  character: string;
  profile_path: string;
  known_for_department: string;
};
