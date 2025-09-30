import { memo } from "react";
import { Heart } from "lucide-react";

interface HeaderProps {
  onHomeClick: () => void;
  onWishListClick: () => void;
  wishListCount: number;
  currentView: "home" | "detail" | "wishlist";
}

export const Header = memo<HeaderProps>(({
  onHomeClick,
  onWishListClick,
  wishListCount,
}) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__brand">
            <button
              onClick={onHomeClick}
              className="header__logo"
            >
              MYTHERESA
            </button>
          </div>

          <div className="header__actions">
            <button
              className="header__wishlist-button"
              onClick={onWishListClick}
            >
              <Heart className="header__wishlist-icon" />
              {wishListCount > 0 && (
                <span className="header__wishlist-badge">
                  {wishListCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});
