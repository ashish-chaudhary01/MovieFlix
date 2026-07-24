// only use types when you are working with typescript not javascript
// tv and movies response data is very similar if you want to use only the single responseType you can use the below one: this will work well
// export type ResponseData = {
//   id: string;
//   title?: string;
//   name?: string;
//   poster_path: string;
//   overview: string;
//   backdrop_path: string;
//   vote_average: string;
//   release_date?: string;
//   first_air_date?: string;
//   genre_ids: string[];
//   media_type: string;
// };

export type MovieData = {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  vote_average: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: string[];
  media_type: string;
  page?: string;
  total_pages?: string;
};
export type TvShowsData = {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  vote_average: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: string;
  media_type: string;
};

export type MovieDetails = {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  release_date: string;
  runtime: string;
  genres: [];
  trailer?: Trailer;
  cast?: CastData[];
};

// tv show/series details type
export type SeriesDetails = {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  first_air_date: string;
  number_of_seasons: string;
  number_of_episodes: string;
  seasons: [];
  genres: [];
  trailer?: Trailer;
  cast?: CastData[];
};

// genre list type
export type genreData = {
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
