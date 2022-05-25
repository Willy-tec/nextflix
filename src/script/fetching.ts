import {
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
const movie_url = `/movie/`

// discover query => ?api_key=${process.env.TMDB}&&language=fr-FR&&with_genres=27&&release_date.gte=2021&&include_adult=true`;

export async function fetchGenre() {
  let result: genres[] = [];

  const target = `${url}${genre_url}?${api_info}&&${lang_info}`;
  await fetch(target)
    .then((data) => data.json())
    .then((data) => (result = data.genres));

  return result;
}

export async function fetchDiscover() {
  let result: discover = {} as discover;
  const target = `${url}${discover_url}?${api_info}&&${lang_info}&&with_genres=27&&release_date.gte=2022&&include_adult=true`;
  await fetch(target)
    .then((data) => data.json())
    .then((data) => (result = data));
  return result;
}
export async function fetchDiscoverByGenre(genreId: number) {
  let result: discover = {} as discover;
  const target = `${url}${discover_url}?${api_info}&&${lang_info}&&with_genres=${genreId}&&release_date.gte=2022&&include_adult=true&&inclucde_video=true`;

  await fetch(target)
    .then((data) => data.json())
    .then((data) => (result = data));
  return result;
}

function makeQueryString(): string {
  return "";
}
export async function fetchHomeSample() {
  const genres = await fetchGenre();
  let response: shortResponse1[] = [];

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
    let arr= data.results.slice(0, 6)
    arr.forEach(element => {
      element.poster_path = url + movie_url + element.id  element.poster_path
    });
    response.push({
      page: data.page,
      results: data.results.slice(0, 6), //result.slice(0, 6),
      genre: genres[i],
      total_results: data.total_results,
      total_pages: data.total_pages,
    });
  }

  return response;
}
