import styles from '../searchbar/searchbar.module.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import SearchedMovies from '../searchedMovies/searchedMovies';
import Head from 'next/head';

const SearchBar = ({setSearchTerm, movies}) =>
{
    const [inputField, setInputField] = useState("");
    const initial = useRef(true);

    useEffect(() =>
    {
        if (initial.current)
        {
            initial.current = false;
            return;
        };
     
        const timer = setTimeout(() =>
        {
         setSearchTerm(inputField);
        }, 500);
        return () => clearTimeout(timer);
    }, [setSearchTerm, inputField]);

    const handleOnInputChange = (e) =>
    {
        setInputField(e.target.value);
        setSearchTerm(inputField); 
    }

    return (
        <>
            <div className={styles.searchBarContainer}>
                <input 
                    type = "text" 
                    onChange = {handleOnInputChange} 
                    value = {inputField} 
                    placeholder = 'People, titles'
                    className = {styles.searchMovie} 
                />
                <div className={styles.container}>
                    {
                        movies.results.map((movie) => {
                        const { poster_path, title, id } = movie;
                        return <div key={id} className={styles.moviesWrapper}>
                                    <SearchedMovies title={title} imageUrl={poster_path} id={id}/>
                               </div>
                    })}
                </div>
            </div>
        </>
    )
};

export default SearchBar;