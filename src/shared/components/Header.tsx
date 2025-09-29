import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { Button } from "./button";

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
    <div>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={onHomeClick}
                className="text-2xl font-light tracking-wider"
              >
                MYTHERESA
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative"
                onClick={onWishListClick}
              >
                <Heart className="h-4 w-4" />
                {wishListCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishListCount}
                  </span>
                )}
              </Button>
            
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
