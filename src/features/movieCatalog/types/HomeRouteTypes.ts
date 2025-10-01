/**
 * Home feature specific types
 */
import { Movie } from "@/shared/types/commonTypes";

// Movie section data structure for home page
export interface MovieSectionData {
  id: string;
  title: string;
  movies: Movie[];
}

// Home page section identifiers
export type HomeSectionType = "popular" | "top-rated" | "upcoming";
