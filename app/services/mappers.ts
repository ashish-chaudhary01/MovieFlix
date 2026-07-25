import type { Media } from "~/types";

// both for series and movies data
export function mapMedia(media: Media) {
  return {
    id: media.id,
    title: media.title,
    name: media.name,
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    vote_average: media.vote_average,
    overview: media.overview,
    release_date: media.release_date,
    first_air_date: media.first_air_date,
    genre_ids: media.genre_ids,
    media_type: media.media_type,
  };
}
