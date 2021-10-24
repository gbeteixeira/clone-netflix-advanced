const API_KEY = 'your api key';
const BASE_API = 'https://api.themoviedb.org/3';


const FetchTmdb = async (endpoint: string) => {
  const req = await fetch(`${BASE_API}${endpoint}`);
  const json = await req.json();
  return json;
}

const tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await FetchTmdb(`/trending/all/week?language=pt-br&api_key=${API_KEY}`)
      },
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await FetchTmdb(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`),
        defaultCard: false
      },
      {
        slug: 'top',
        title: 'Top 10 filmes',
        items: await FetchTmdb(`/trending/all/week?language=pt-br&api_key=${API_KEY}&watch_region=pt-br`),
        topList: true
      },
      {
        slug: 'topreated',
        title: 'Em alta',
        items: await FetchTmdb(`/movie/top_rated?language=pt-br&api_key=${API_KEY}`),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await FetchTmdb(`/discover/movie?with_genres=28&language=pt-br&api_key=${API_KEY}`),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await FetchTmdb(`/discover/movie?with_genres=35&language=pt-br&api_key=${API_KEY}`),
      },
      {
        slug: 'Horror',
        title: 'Terror',
        items: await FetchTmdb(`/discover/movie?with_genres=27&language=pt-br&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await FetchTmdb(`/discover/movie?with_genres=10749&language=pt-br&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await FetchTmdb(`/discover/movie?with_genres=99&language=pt-br&api_key=${API_KEY}`)
      },
    ]
  },
  getMovieInfo: async (movieId: number, type: string) => {
    let info = {};

    if(movieId){
      if(type === 'movie'){
        info = await FetchTmdb(`/movie/${movieId}?language=pt-br&api_key=${API_KEY}`);
      }else if(type === 'tv'){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info = await FetchTmdb(`/tv/${movieId}?language=pt-br&api_key=${API_KEY}`);
      }
    }

    return info;
  }
}

export default tmdb;