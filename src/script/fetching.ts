import {
  configuration,
  discover,
  genres,
  movie,
  movieTrailerResponse,
  sampleData,
  shortMovie,
  shortResponse,
  shortResponse1,
} from "../types/TMDB";

const url = `https://api.themoviedb.org/3`;
const api_info = `api_key=${process.env.TMDB}`;
const localite = "fr-FR";
const lang_info = `language=${localite}`;
const genre_url = `/genre/movie/list`;
const discover_url = `/discover/movie`;
const movie_url = `/movie/`;
const config_url = "/configuration";
const MOVIE_COUNT_BY_GENRE = 5;

export async function fetchGenre(): Promise<genres[]> {
  const target = `${url}${genre_url}?${api_info}&&${lang_info}`;

  return await fetch(target)
    .then((data) => data.json())
    .then((data) => data.genres);
}

export async function fetchDiscover(): Promise<discover> {
  const target = `${url}${discover_url}?${api_info}&&${lang_info}&&with_genres=27&&release_date.gte=2022&&include_adult=true`;
  return await fetch(target).then((data) => data.json());
}

export async function fetchDiscoverByGenre(genreId: number): Promise<discover> {
  const target = `${url}${discover_url}?${api_info}&&${lang_info}&&with_genres=${genreId}&&release_date.gte=2022&&include_adult=true&&inclucde_video=true`;
  return await fetch(target).then((data) => data.json());
}

export async function getConfigData(): Promise<configuration> {
  // The configuration object return some info about image url and their size
  const target = `${url}${config_url}?${api_info}`;
  return await fetch(target).then((data) => data.json());
}

export async function fetchHomeSample() {
  const genres = await fetchGenre();
  let response: shortResponse1[] = [];
  let config = await getConfigData();
  let MovieTempArr: number[] = [];
  let poster_url =
    config.images.secure_base_url + config.images.poster_sizes[3];

  for (let i = 0; i < genres.length; i += 1) {
    const data = (await fetchDiscoverByGenre(genres[i].id)) as sampleData;

    let arr = getArrWithOnlyNewMovie(data.results, MovieTempArr);
    arr = arr.slice(0, MOVIE_COUNT_BY_GENRE);
    MovieTempArr.push(...arr.map((el) => el.id));
    let MovieArrayWithUrl: movie[];
    MovieArrayWithUrl = await Promise.all(
      arr.map(async (element) => {
        element.poster_path = poster_url + element.poster_path;
        element.backdrop_path = poster_url + element.backdrop_path;
        element.trailer_key = await getTrailerUrl(element.id);
        return element;
      })
    );

    response.push({
      page: data.page,
      results: MovieArrayWithUrl,
      genre: genres[i],
      total_results: data.total_results,
      total_pages: data.total_pages,
    });
  }
  return response;
}

async function getTrailerUrl(id: number): Promise<string> {
  let TARGET = `${url}${movie_url}${id}/videos?${api_info}&&${lang_info}`;
  // on récupère les clef des trailers pour un film
  let data: movieTrailerResponse = await fetch(TARGET).then((data) =>
    data.json()
  );
  // Et si le resultat est nulle, on retente sans la localisation
  if (data.results.length === 0) {
    TARGET = `${url}${movie_url}${id}/videos?${api_info}`;
    data = await fetch(TARGET).then((data) => data.json());
  }
  // Si toujours aucun trailer, on envoie le string "error"
  // Néanmoins, il ne s'agit aps d'une erreur, juste absence de trailer
  if (data.results.length === 0) return "error";

  // On trie pour trouver un trailer officiel, via youtube
  let result = data.results.filter(
    (el) => el.site === "YouTube" && el.type === "Trailer"
  );
  if (result.length > 0) return result[0].key;
  // Si on ne trouve pas, on récupere la 1ere video youtube
  result = data.results.filter((el) => el.site === "YouTube");
  if (result.length > 0) return result[0].key;
  // Sinon, toujours pareil, on signale l'absence.
  return "error";
}

function getArrWithOnlyNewMovie(arr: movie[], filter: number[]) {
  return arr.filter((el) => filter.indexOf(el.id) === -1);
}
