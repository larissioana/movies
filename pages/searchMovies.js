import NavBar from "@/components/nav/navbar";
import SearchBar from "@/components/searchbar/searchbar";
import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "@/lib/movies";
import Head from "next/head";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

const SearchMovies = () => {
    const [movie, setMovie] = useState(initialState);
    const [searchTerm, setSearchTerm] = useState("");

    const getMovies = async (page, searchTerm = '') => {
        try {
        const searchMovie = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&${page}`);
        const movies = await searchMovie.json(page, searchTerm);
        setMovie(prev => ({
            ...movies,
            results :
            page > 1 ? [...prev.results , ...movies.results] : [...movies.results]
        }))
       } catch(error){
        console.error('Api error', error)
    }
}
    useEffect(() => {
    getMovies(1, searchTerm)
    },[searchTerm])
    return (
        <>
        <Head>
        <title>Search Movies</title>
        </Head>
         <NavBar/>
         <SearchBar setSearchTerm={setSearchTerm} movies={movie}/>
        </>
    )
};

export default SearchMovies;