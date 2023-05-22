import { API_KEY, API_URL} from "@/lib/movies";
import MovieDetail from "@/components/movieDetail/movieDetail";


export async function getServerSideProps(context) {
   const movieId = context.params.moviesId;
   const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
   const movieData = await response.json();
   const cast = await fetch(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`);
   const castData = await cast.json();
   const recommendations = await fetch(`${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
   const recommendationsData = await recommendations.json();
 
 return {
        props: {
         movieData,
         castData,
         recommendationsData,
     
        }
    }
};

const Movie = ({movieData, castData, recommendationsData}) => {
   
    return (
    <>
    <MovieDetail movie={movieData} castData={castData} recommendationsData={recommendationsData}/>
    </>
   )
};

export default Movie;