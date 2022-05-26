import {
  configuration,
  discover,
  genres,
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

// discover query => ?api_key=${process.env.TMDB}&&language=fr-FR&&with_genres=27&&release_date.gte=2021&&include_adult=true`;

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

export async function makeQueryString(): Promise<configuration> {
  const target = `${url}${config_url}?${api_info}`;
  return await fetch(target).then((data) => data.json());
}
export async function fetchHomeSample() {
  const genres = await fetchGenre();
  let response: shortResponse1[] = [];
  let config = await makeQueryString();
  let poster_url =
    config.images.secure_base_url + config.images.poster_sizes[3];

  for (let i = 0; i < genres.length; i += 1) {
    const data = (await fetchDiscoverByGenre(genres[i].id)) as sampleData;
    // const result = data.results.map<shortMovie>((res) => {
    //   return {
    //     id: res.id,
    //     title: res.title,
    //     video: res.video,
    //     release_date: res.release_date,
    //     overview: res.overview,
    //   };
    // });
    let arr = data.results.slice(0, 6);
    arr.forEach((element) => {
      element.poster_path = poster_url + element.poster_path;
      element.backdrop_path = poster_url + element.backdrop_path;
    });
    response.push({
      page: data.page,
      results: arr, //result.slice(0, 6),
      genre: genres[i],
      total_results: data.total_results,
      total_pages: data.total_pages,
    });
  }

  return response;
}
