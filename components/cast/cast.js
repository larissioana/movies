import styles from '../cast/cast.module.css';
import Image from 'next/image';
import { IMAGE_URL_SMALL } from '@/lib/movies';
import Link from 'next/link';

const Cast = ({castData}) => {
   const actors = castData.cast.length === 0;
    return (
      <>
      {actors ?
      <div></div> :
       <h2 className={styles.title}>Actors</h2> }
        <div className={styles.castContainer}>
         <div className={styles.container}>
            {castData.cast.map((cast) => {
                const {name, id, profile_path} = cast;
              return <div key={id} className={styles.castWrapper}>
                <div className={styles.actorName}>
                 <h4 className={styles.name}>{name}</h4>
                 </div>
                  {cast.profile_path ?
                 <Link href={`/actor/${id}`}>
                  <Image src={IMAGE_URL_SMALL + profile_path} width='200' height='300' alt={name} className={styles.castImage}/>
                 </Link>
                 : 
                 <Link href={`/actor/${id}`}>
                 <Image src={'/static/no-actors.png'} width='200' height='300' alt={name} className={styles.castImage}/>
                 </Link>
              }
              </div>
            }).slice(0, 6)}
         </div> 
         </div>
         </>
       )
};

export default Cast;