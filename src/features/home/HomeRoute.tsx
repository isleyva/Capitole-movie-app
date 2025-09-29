import { useState, useEffect } from "react";
import { MovieSection, type Movie } from "@/shared/components";

export function HomeRoute() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocked data loading (replace with real API calls)
    const loadMovies = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const sampleMovies: Movie[] = [
        {
          id: 1,
          title: "Blade Runner 2049",
          brand: "Warner Bros",
          price: "€24.99",
          image:
            "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
          vote_average: 8.0,
        },
        {
          id: 2,
          title: "Dune",
          brand: "Legendary",
          price: "€26.99",
          image:
            "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
          vote_average: 8.2,
        },
        {
          id: 3,
          title: "The Matrix",
          brand: "Warner Bros",
          price: "€22.99",
          image:
            "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
          vote_average: 8.7,
        },
        {
          id: 4,
          title: "Interstellar",
          brand: "Paramount",
          price: "€25.99",
          image:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          vote_average: 8.6,
        },
        {
          id: 5,
          title: "Inception",
          brand: "Warner Bros",
          price: "€23.99",
          image:
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          vote_average: 8.8,
        },
        {
          id: 6,
          title: "The Dark Knight",
          brand: "Warner Bros",
          price: "€21.99",
          image:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          vote_average: 9.0,
        },
      ];

      setPopularMovies(sampleMovies);
      setTopRatedMovies([...sampleMovies].reverse());
      setUpcomingMovies([...sampleMovies].sort(() => Math.random() - 0.5));
      setIsLoading(false);
    };

    loadMovies();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    console.log("Movie clicked:", movie);
  };

  return (
    <div className="home-route">
      <div className="home-route__hero">
        <h1 className="home-route__title">MYTHERESA MOVIE HUB</h1>
        <p className="home-route__subtitle">
          Discover our exclusive movie collection
        </p>
      </div>

      <MovieSection
        popularMovies={popularMovies}
        topRatedMovies={topRatedMovies}
        upcomingMovies={upcomingMovies}
        isLoading={isLoading}
        onMovieClick={handleMovieClick}
      />
    </div>
  );
}
