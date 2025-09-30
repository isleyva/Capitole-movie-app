import { memo } from "react";
import { MovieCarousel } from "@/shared/components";
import { useMovieSections } from "../hooks";

export const MovieSections = memo(() => {
  const { movieSections, error } = useMovieSections();

  if (error) {
    return (
      <div className="movie-section">
        <div className="movie-section__error">
          <p>Error loading movies: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-section">
      <div className="movie-section__container">
        {movieSections.length === 0 ? (
          <>
            <div className="movie-carousel--popular">
              <MovieCarousel
                title="LOADING YOUR FAVOURITE MOVIES"
                movies={[]}
                isLoading={true}
              />
            </div>
          </>
        ) : (
          movieSections.map((section) => (
            <div key={section.id} className={`movie-carousel--${section.id}`}>
              <MovieCarousel
                title={section.title}
                movies={section.movies}
                isLoading={false}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
});
