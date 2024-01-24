import { useRouter } from 'next/router';
import styles from '../banner/banner.module.css';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/movies';

const Banner = ({movies}) =>
{
  const router = useRouter();
  const {title, imageUrl, id} = movies;
 
  const handleOnClickButton = () =>
  {
    router.push(`/movies/${id}`)
  };

    return (
        <div className={styles.container}>
          <div className={styles.leftWrapper}>
              <div className={styles.left}>
                <div className={styles.nseriesWrapper}>
                  <p className={styles.firstLetter}>N</p>
                  <p className={styles.series}>S E R I E S</p>
                </div>
                <h2 className={styles.title}>{title}</h2>
                <button onClick={handleOnClickButton} className={styles.seeMoreBtn}>More Info</button>
              </div>
          </div>
           <Image
               src={`${IMAGE_URL}` + imageUrl}
               width='1500' 
               height='900' 
               className={styles.bannerImg} 
               alt={title}
           />
        </div>      
    )
};

export default Banner;