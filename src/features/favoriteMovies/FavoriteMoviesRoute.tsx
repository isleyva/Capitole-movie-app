import { useWishlist } from "@/app/providers/WishlistProvider";
import { WishList } from "./components";

function FavoriteMoviesRoute() {
  const { totalMovies } = useWishlist();

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__header">
          <h1 className="wishlist__title">My Favorite Movies</h1>
          <p className="wishlist__count">
            {totalMovies} {totalMovies === 1 ? "movie" : "movies"}
          </p>
        </div>

        <WishList />
      </div>
    </div>
  );
}

export default FavoriteMoviesRoute;
