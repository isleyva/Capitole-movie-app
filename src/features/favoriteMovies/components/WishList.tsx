import { memo, useCallback } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/app/providers/WishlistProvider";
import { Button, MovieCard } from "@/shared/components";

export const WishList = memo(() => {
  const navigate = useNavigate();
  const { movies, totalMovies } = useWishlist();
  const handleBack = useCallback(() => navigate("/"), [navigate]);

  if (totalMovies === 0) {
    return (
      <div className="wishlist__empty">
        <Heart className="wishlist__empty-icon" />
        <h3 className="wishlist__empty-title">Your wishlist is empty</h3>
        <p className="wishlist__empty-description">
          Save your favorite movies to watch later
        </p>
        <Button onClick={handleBack} className="wishlist__empty-button">
          Explore Movies
        </Button>
      </div>
    );
  }

  return (
    <div className="wishlist__grid" data-testid="wishlist-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="wishlist__card-wrapper">
          <MovieCard className="movie-card" movie={movie} isLoading={false} isPlaceholder={false} />
        </div>
      ))}
    </div>
  );
});
