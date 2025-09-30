import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/shared/types/commonTypes";

type MovieCarouselProps = {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
};

export const MovieCarousel = memo<MovieCarouselProps>(({
  title,
  movies,
  isLoading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  
  const shouldShowSkeleton = isLoading;
  const displayMovies = movies;

  const updateItemsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 640) {
      setItemsPerView(2); 
    } else if (width <= 1024) {
      setItemsPerView(3); 
    } else {
      setItemsPerView(5); 
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  const maxIndex = useMemo(() => 
    Math.max(0, displayMovies.length - itemsPerView),
    [displayMovies.length, itemsPerView]
  );

  const nextSlide = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const getTransformValue = useCallback(() => {
    return currentIndex * (100 / itemsPerView);
  }, [currentIndex, itemsPerView]);

  return (
    <section className="movie-carousel">
      <div className="movie-carousel__header">
        <h2 className="movie-carousel__title">{title}</h2>
      </div>

      <div className="movie-carousel__container">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="movie-carousel__nav movie-carousel__nav--prev"
        >
          <ChevronLeft className="movie-carousel__nav-icon" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="movie-carousel__nav movie-carousel__nav--next"
        >
          <ChevronRight className="movie-carousel__nav-icon" />
        </Button>

        <div className="movie-carousel__viewport">
          <div
            className={`movie-carousel__track ${
              shouldShowSkeleton ? "movie-carousel__track--loading" : ""
            }`}
            style={{
              transform: `translateX(-${getTransformValue()}%)`
            }}
          >
            {shouldShowSkeleton
              ? Array.from({ length: itemsPerView }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="movie-carousel__item movie-carousel__item--loading"
                  >
                    <div className="movie-carousel__card movie-carousel__card--loading">
                      <div className="movie-carousel__image-container">
                        <div className="movie-carousel__image movie-carousel__image--loading">
                          <div className="skeleton skeleton--image">
                            <div className="skeleton__shimmer"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="movie-carousel__info movie-carousel__info--loading">
                      <div className="movie-carousel__brand movie-carousel__brand--loading">
                        <div className="skeleton skeleton--brand"></div>
                      </div>
                      <div className="movie-carousel__movie-title movie-carousel__movie-title--loading">
                        <div className="skeleton skeleton--title"></div>
                        <div className="skeleton skeleton--title-short"></div>
                      </div>
                      <div className="movie-carousel__price movie-carousel__price--loading">
                        <div className="skeleton skeleton--price"></div>
                      </div>
                    </div>
                  </div>
                ))
              : displayMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isLoading={false}
                    isPlaceholder={movies.length === 0}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
});