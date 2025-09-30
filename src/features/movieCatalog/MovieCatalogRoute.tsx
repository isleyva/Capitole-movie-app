import { MovieSections } from "./components/MovieSection";

export function MovieCatalogRoute() {
  return (
    <div className="home-route">
      <div className="home-route__hero">
        <h1 className="home-route__title">MYTHERESA MOVIE HUB</h1>
        <p className="home-route__subtitle">
          Discover our exclusive movie collection
        </p>
      </div>

      <MovieSections />
    </div>
  );
}
