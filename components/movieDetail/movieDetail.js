import Image from "next/image";
import styles from '../movieDetail/movieDetail.module.css';
import NavBar from "../nav/navbar";
import Cast from "../cast/cast";
import VideoTrailer from "../trailer/videoTrailer";
import { IMAGE_URL } from "@/lib/movies";
import Head from "next/head";
import SimilarMovies from "../similar/similar";


const MovieDetail = ({movie, castData, similarResults}) =>
{

    const {
        overview, 
        backdrop_path, 
        poster_path,
        release_date,
        tagline,
        vote_average,
        title,
    } = movie;

    const vote = Math.floor(vote_average);

    return (
            <>
                <Head>
                    <title>{title}</title>
                </Head>
                <NavBar/>
                <div className={styles.trailer}>
                    {
                    movie.videos.results.map((video) =>
                    {
                        return <VideoTrailer video = {video} key = {video.id}/>
                    })[0]}
                </div>
                <div 
                    className={styles.movieContent}
                    style={{
                    backgroundImage: `url('${IMAGE_URL}${backdrop_path}')`,
                    backgroundPosition: 'top',
                    backgroundSize:'cover'
                    }}
                >
                    <div className={styles.flexContainer}>
                        <div className={styles.col1}>
                            <h2 className={styles.title}>{title}</h2>
                            <p className={styles.tagline}>{tagline}</p>
                            <span className={styles.releaseDate}>Released: {release_date}</span>
                            <p className={styles.description}>{overview}</p>
                            <p className={styles.vote}>
                                <span className={styles.text}>{vote}</span>
                            </p>
                        </div>
                        <div className={styles.col2}>
                            {
                            poster_path ? 
                            <Image 
                                src = {IMAGE_URL + poster_path} 
                                width = '300' 
                                height = '400' 
                                alt = {title} 
                                className = {styles.posterPath}
                            />
                            :
                            <Image 
                                src = '/static/image.jpg' 
                                alt = {title}  
                                width = '300' 
                                height = '400' 
                                className = {styles.cardImg}
                            />
                            }
                        </div>
                    </div>
                </div>
                <Cast castData={castData}/>
                <SimilarMovies title='Similar Movies' similarResults={similarResults}/>
            </>
        )
};

export default MovieDetail;