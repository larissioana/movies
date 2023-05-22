import styles from '../recommendations/recommendations.module.css';
import { IMAGE_URL} from '@/lib/movies';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Recommendations = ({recommendationsData=[], title}) => {
    const scale = {scale:1.1};

    return (
        <>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.container} >
         {recommendationsData.results.map((recommendation) => {
            const {title, poster_path, id} = recommendation;
            return <motion.div key={id} className={styles.recommendationContainer} whileHover={...scale}>
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

export default Recommendations;