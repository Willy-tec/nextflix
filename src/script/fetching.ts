import {
  configuration,
  discover,
  genres,
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
  let poster_url =
    config.images.secure_base_url + config.images.poster_sizes[3];

  for (let i = 0; i < genres.length; i += 1) {
    const data = (await fetchDiscoverByGenre(genres[i].id)) as sampleData;

    let arr = data.results.slice(0, 5);
    arr.forEach(async (element) => {
      element.poster_path = poster_url + element.poster_path;
      element.backdrop_path = poster_url + element.backdrop_path;
      element.trailer_key = await getTrailerUrl(element.id);
    });
    response.push({
      page: data.page,
      results: arr,
      genre: genres[i],
      total_results: data.total_results,
      total_pages: data.total_pages,
    });
  }
  return response;
}

async function getTrailerUrl(id: number): Promise<string> {
  let TARGET = `${url}${movie_url}${id}/videos?${api_info}&&${lang_info}`;
  let data: movieTrailerResponse = await fetch(TARGET).then((data) =>
    data.json()
  );
  if (data.results.length === 0) {
    TARGET = `${url}${movie_url}${id}/videos?${api_info}`;
    data = await fetch(TARGET).then((data) => data.json());
  }
  if (data.results.length === 0) return "error";

  let result = data.results.filter(
    (el) => el.site === "YouTube" && el.type === "Trailer"
  );
  if (result.length > 0) return result[0].key;

  result = data.results.filter((el) => el.site === "YouTube");
  if (result.length > 0) return result[0].key;

  TARGET = `${url}${movie_url}${id}/videos?${api_info}`;
  data = await fetch(TARGET).then((data) => data.json());
  result = data.results.filter((el) => el.site === "YouTube");
  if (result.length > 0) return result[0].key;

  return "error";
}
