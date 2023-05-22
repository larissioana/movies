import Link from 'next/link';
import styles from '../sectioncards/sectioncards.module.css';
import Cards from "../cards/cards";


const SectionCards = ({movies, title, size}) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
            {movies.map((movie) => {
            return (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
            <Cards movie={movie} size={size}/>
            </Link>
            )})}
            </div>
        </div>
    )
};

export default SectionCards;