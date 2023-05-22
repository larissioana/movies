import Image from "next/image";
import styles from '../cards/cards.module.css';
import cls from 'classnames';
import { motion } from "framer-motion";
import { IMAGE_URL_SMALL } from "@/lib/movies";

const Cards = ({movie=[], size}) => {
    const {title, posterPath, id} = movie;

    const classMap = {
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem
    };
    
    const scale = id === 0? {scaleY: 1.1} : {scale: 1.1};

    return (
        <div className={styles.container}>
        <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={...scale}>
        <h2>{title}</h2>
        {posterPath ? 
        <Image src={IMAGE_URL_SMALL + posterPath}
         fill
         alt={title} 
         className={styles.cardImg}
          />
         : 
         <Image src='/static/image.jpg'
         fill
         alt={title} 
         className={styles.cardImg}
          />
         }
        </motion.div>
        </div>
    )
};

export default Cards;