export interface genres {
  id: number;
  name: string;
}
export interface production_companies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
export interface production_countries {
  iso_3166_1: string;
  name: string;
}
export interface spoken_languages {
  iso_639_1: string;
  name: string;
}
export interface movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {} | null;
  budget: number;
  genres: genres[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: production_companies[];
  production_countries: production_countries[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  trailer_key: string;
  vote_average: number;
  vote_count: number;
}

export interface discover {
  page: number;
  results: movie[];
  total_results: number;
  total_pages: number;
}
export interface configuration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export interface sampleData extends discover {
  genre: genres;
  result: [];
}

export interface shortMovie {
  id: number;
  title: string;
  video: boolean;
  release_date: string | null;
  overview: string | null;
}
export interface shortResponse {
  page: number;
  results: shortMovie[];
  total_results: number;
  total_pages: number;
  genre: genres;
}
export interface shortResponse1 {
  page: number;
  results: movie[];
  total_results: number;
  total_pages: number;
  genre: genres;
}

export interface movieTrailerResponse {
  id: number;
  results: TrailerObject[];
}
export interface TrailerObject {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}
