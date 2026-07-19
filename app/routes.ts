import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/index.tsx"),
  route("/search", "routes/search/index.tsx"),
  route("/movies", "routes/moviesPage/index.tsx"),
  route("/movie/:id", "routes/moviesPage/movieDetails.tsx"),
  route("/tv", "routes/tv/index.tsx"),
  route("/tv/:id", "routes/tv/seriesDetails.tsx"),
  route("/watchlist", "routes/watchlist/index.tsx"),
] satisfies RouteConfig;
