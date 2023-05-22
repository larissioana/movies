
export const API_URL = 'https://api.themoviedb.org/3'
export const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DATABASE_API_KEY
const POPULAR_MOVIES = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_URL_SMALL = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async (query, page) => {
    try{
        const response = await fetch(`${API_URL}/movie/${query}?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        return data?.results?.map((item) => {
        
         return {
            title: item.title,
            imageUrl: item.backdrop_path,
            id: item.id,
            description: item.overview,
            posterPath: item.poster_path,
            genres: item.genre_ids
}
        })
    } catch(error) {
      console.error('Something went wrong with the movies library', error);
   
    }
};

export const fetchPopularMovies = async (page) => {
    const movies = await fetch (`${POPULAR_MOVIES}&page=${page}`);
    return await movies.json()
};


