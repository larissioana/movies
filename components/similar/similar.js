import styles from '../similar/similar.module.css';
import { IMAGE_URL} from '@/lib/movies';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SimilarMovies = ({title, similarResults}) => {
    const scale = {scale:1.1};
    const results = similarResults.length  === 0;
    console.log({results})
    return (
        <>
        {results ?
        <div></div> :
        <h2 className={styles.title}>{title}</h2>
        }
        
         <div className={styles.container} >
         {similarResults.map((similarMovie) => {
            const {title, poster_path, id} = similarMovie;
            return <motion.div key={id} className={styles.similarContainer} whileHover={...scale}>
                 {poster_path ?
                 <>
                 <Link href={`/movies/${id}`}> 
                <Image className={styles.posterPath} src={IMAGE_URL + poster_path} alt={title} width='300' height='300'/>
                </Link>
                </> :
                 <>
                 <Link href={`/movies/${id}`}> 
                <Image className={styles.posterPath} src='/static/image.jpg' alt={title} width='300' height='300'/>
                </Link>
                </>
                 }
                  </motion.div>
         }).slice(0, 5)}
    
        </div>

        </>
    )
};

export default SimilarMovies;