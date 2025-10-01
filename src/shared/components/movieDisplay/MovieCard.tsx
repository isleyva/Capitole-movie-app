import { memo, useMemo, useCallback } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Movie } from "@/shared/types/commonTypes";
import { useWishlist } from "@/ApplicationLayer/providers/WishlistProvider";

type MovieCardProps = {
  movie: Movie;
  isLoading?: boolean;
  isPlaceholder?: boolean;
  showWishlist?: boolean;
  className?: string;
  category?: string;
};

export const MovieCard = memo<MovieCardProps>(
  ({ movie, isLoading = false, isPlaceholder = false, className, category }) => {
    const navigate = useNavigate();
    const { addMovie, removeMovie, isInWishlist } = useWishlist();

    const isMovieInWishlist = useMemo(
      () => isInWishlist(movie.id),
      [isInWishlist, movie.id]
    );

    const handleCardClick = useCallback(() => {
      if (!isLoading && !isPlaceholder) {
        const url = category
          ? `/movie/${movie.id}?c=${encodeURIComponent(category)}`
          : `/movie/${movie.id}`;
        navigate(url);
      }
    }, [navigate, movie.id, isLoading, isPlaceholder, category]);

    const handleWishlistToggle = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isLoading && !isPlaceholder) {
          if (isMovieInWishlist) {
            removeMovie(movie.id);
          } else {
            addMovie(movie);
          }
        }
      },
      [
        isLoading,
        isPlaceholder,
        isMovieInWishlist,
        removeMovie,
        addMovie,
        movie.id,
      ]
    );

    const isMovieCardStyle = className === "movie-card";

    const containerClassName = useMemo(() => {
      if (isMovieCardStyle) {
        return className;
      }
      return `movie-carousel__item ${
        isPlaceholder ? "movie-carousel__item--placeholder" : ""
      }`;
    }, [isMovieCardStyle, className, isPlaceholder]);

    const heartIconClassName = useMemo(
      () =>
        `movie-carousel__heart-icon ${
          isMovieInWishlist ? "movie-carousel__heart-icon--active" : ""
        }`,
      [isMovieInWishlist]
    );

    if (isPlaceholder) {
      return <div className={containerClassName} aria-busy="true" />;
    }

    return (
      <div className={containerClassName} onClick={handleCardClick}>
        <div className="movie-carousel__card">
          <button
            className="movie-carousel__wishlist-button"
            disabled={isLoading || isPlaceholder}
            onClick={handleWishlistToggle}
            aria-label={`Add ${movie.title} to wishlist`}
          >
            <Heart className={heartIconClassName} />
          </button>

          <div className="movie-carousel__image-container">
            {isLoading ? (
              <div className="movie-carousel__placeholder-image">
                <div className="movie-carousel__placeholder-content">
                  <div className="movie-carousel__spinner"></div>
                </div>
              </div>
            ) : (
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-carousel__image"
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="movie-carousel__info">
          <p className="movie-carousel__brand">{movie.brand}</p>
          <h3 className="movie-carousel__movie-title">{movie.title}</h3>
        </div>
      </div>
    );
  }
);
