import { memo, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/ApplicationLayer/providers/WishlistProvider";
import { Movie } from "@/shared/types/commonTypes";
import { MovieCarousel } from "@/shared/components";

type MovieDetailProps = {
  movie: Movie;
};

export const MovieDetail = memo<MovieDetailProps>(({ movie }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("c") || undefined; 
  const { addMovie, removeMovie, isInWishlist } = useWishlist();

  const isInWishList = useMemo(
    () => isInWishlist(movie.id),
    [isInWishlist, movie.id]
  );

  const handleWishlistToggle = useCallback(() => {
    if (isInWishList) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  }, [isInWishList, removeMovie, addMovie, movie.id]);

  const variantClass = category ? `movie-detail movie-detail--${category}` : "movie-detail";

  return (
    <div className={variantClass} data-category={category || undefined}>
      <div className="movie-detail__container">
        <div className="movie-detail__grid">
          <div className="movie-detail__image-section">
            <img
              src={movie.image}
              alt={movie.title}
              className="movie-detail__poster"
            />
          </div>

          <div className="movie-detail__content">
            <div className="movie-detail__main-content">
              <div className="movie-detail__brand">{movie.brand}</div>

              <h1 className="movie-detail__title">{movie.title}</h1>

              <div className="movie-detail__info-section">
                <h3 className="movie-detail__info-title">MOVIE DETAILS</h3>

                <div className="movie-detail__metadata">
                  <div className="movie-detail__metadata-item">
                    <span className="movie-detail__metadata-label">
                      Studio:
                    </span>
                    <span className="movie-detail__metadata-value">
                      {movie.brand}
                    </span>
                  </div>
                  <div className="movie-detail__metadata-item">
                    <span className="movie-detail__metadata-label">Year:</span>
                    <span className="movie-detail__metadata-value">
                      {movie.release_date}
                    </span>
                  </div>
                  <div className="movie-detail__metadata-item">
                    <span className="movie-detail__metadata-label">
                      Rating:
                    </span>
                    <span className="movie-detail__metadata-value">
                      ★ {movie.vote_average}
                    </span>
                  </div>
                  <div className="movie-detail__metadata-item">
                    <span className="movie-detail__metadata-label">
                      Release date:
                    </span>
                    <span className="movie-detail__metadata-value">
                      {movie.release_date}
                    </span>
                  </div>
                  <div className="movie-detail__metadata-item">
                    <span className="movie-detail__metadata-label">
                      Revenue:
                    </span>
                    <span className="movie-detail__metadata-value">
                      {movie.revenue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-detail__wishlist-section">
              <button
                className="movie-detail__wishlist-button"
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`movie-detail__wishlist-icon ${
                    isInWishList ? "active" : ""
                  }`}
                />
                {isInWishList ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
              </button>
            </div>
          </div>
        </div>

        <div className="movie-detail__recommendations">
          {movie.recommendations && movie.recommendations.length > 0 ? (
            <MovieCarousel
              title="YOU MIGHT ALSO LIKE"
              movies={movie.recommendations}
              isLoading={false}
              category="recommendation"
            />
          ) : (
            <div className="movie-detail__no-recommendations">
              <div className="movie-detail__no-recommendations-content">
                <h3 className="movie-detail__no-recommendations-title">
                  RECOMMENDATIONS
                </h3>
                <p className="movie-detail__no-recommendations-message">
                  We don't have recommendations for this movie yet.
                </p>
                <p className="movie-detail__no-recommendations-subtitle">
                  Check back later for curated suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
