import { useParams } from "react-router-dom";
import { MovieDetail } from "./components";
import { useMovieDetails } from "./hooks";
import {
  Loading,
  MovieDetailError,
  MovieDetailNotFound,
} from "@/shared/components";

function MovieDetailsRoute() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id) : 0;
  const { movie, isLoading, error } = useMovieDetails(movieId);

  if (isLoading) {
    return <Loading message="Loading movie details..." />;
  }

  if (error) {
    return <MovieDetailError message={error} />;
  }

  if (!movie) {
    return <MovieDetailNotFound />;
  }

  return <MovieDetail movie={movie} />;
}

export default MovieDetailsRoute;
