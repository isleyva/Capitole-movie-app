import { Heart } from "lucide-react";

interface HeaderProps {
  onHomeClick: () => void;
  onWishListClick: () => void;
  wishListCount: number;
  currentView: "home" | "detail" | "wishlist";
}

export function Header({
  onHomeClick,
  onWishListClick,
  wishListCount,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__brand">
            <button
              onClick={onHomeClick}
              className="header__logo"
            >
              <div className="header__brand-content">
                <div className="header__main-title">MYTHERESA</div>
                <div className="header__subtitle">MOVIE HUB</div>
                <div className="header__tagline">DISCOVER OUR EXCLUSIVE MOVIE COLLECTION</div>
              </div>
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
}
