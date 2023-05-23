import NavBar from "@/components/nav/navbar";
import {API_KEY, API_URL, IMAGE_URL} from "@/lib/movies";
import styles from '../../styles/actorDetails.module.css';
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

export async function getServerSideProps(context){

const id = context.params.actorId;
const response = await fetch(`${API_URL}/person/${id}?api_key=${API_KEY}&language=en-US`)
const actor = await response.json();

return {
        props: {
         actor
        }
    }
}
const Actor = ({actor}) => {
const {name, biography, birthday, place_of_birth, profile_path, known_for_department} = actor;
const [readMore, setReadMore] = useState(false);
console.log(biography.length)
const handleOnClickReadMore = () => {
    setReadMore(!readMore);
};

 return (
    <>
        <Head>
        <title>{name}</title>
        </Head>
        <div className={styles.actorWrapper}>
        <NavBar/>
        {profile_path?(
            <div>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.container}>
        <div className={styles.leftContainer}>
        <Image className={styles.profilePath} src={IMAGE_URL + profile_path} width='300' height='300' alt={name}/>
        </div>
        <div className={styles.left}>
        {birthday &&
        <h5 className={styles.birthday}>Birthday: <span className={styles.text}>{birthday}</span></h5>
        }
        {place_of_birth &&
        <h5 className={styles.birth}> Place of birth: <span className={styles.text}>{place_of_birth}</span></h5>
         }
        {biography.length > 300 ?
        <div>
        <p className={styles.biography}> Biography: <span className={styles.text}>
         { readMore ? biography : `${biography.substring(0,250)}...`}
        </span></p>
     
        <button className={styles.readMore} onClick={handleOnClickReadMore}>{readMore ? 'Show less' : 'Read more' }</button>

       </div> 
       :<p className={styles.biography}>Biography: <span className={styles.text}>{biography}</span></p> }
        <p className={styles.knownFor}>Known for: <span className={styles.text}>{known_for_department}</span></p>
        </div>
        </div>
        </div>
        ) :( <div className={styles.info}>No information available about this actor 	&#128542;</div>)}
        </div>
     </>
    )
};

export default Actor;