import styles from '../searchedMovies/searchedMovies.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE_URL} from '@/lib/movies';
import { motion } from 'framer-motion';
import Head from 'next/head';

const SearchedMovies = ({imageUrl, title, id}) => {
    const scale = {scale: 1.1};
    return (
        <>
        <Head>
        <title>{title}</title>
        </Head>
        <motion.div className={styles.container} whileHover={...scale}>
        {imageUrl && 
        <Link href={`/movies/${id}`}>
        <Image src={IMAGE_URL + imageUrl} width='200' height='200' alt={title} className={styles.cardImg}/>
        </Link>
    }
        </motion.div>
        </>
    )
};

export default SearchedMovies;