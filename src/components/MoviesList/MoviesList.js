import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'
import {useForm} from "react-hook-form";
import {genresActions} from "../../redux/slices/genresSlice";


const MoviesList = () => {

    const {register, handleSubmit,reset} = useForm({
        mode: 'all',
    })

    const{movies,total_pages,keyWord,selGenres}=useSelector(state => state.movies)


    console.log(selGenres);


    const{genres}=useSelector(state => state.genres)

    const dispatch=useDispatch()

    const [selectedGenres, setSelectedGenres] = useState([]);

    console.log(selectedGenres);


    const[query, setQuery]=useSearchParams({page:'1'})


    useEffect(() => {
        if (!keyWord && !selGenres ) {
            dispatch(moviesActions.getAll({page: query.get('page')}))
        } else if(!selGenres) {
            dispatch(moviesActions.searchMovie({keyWord, page: query.get('page')}))
        } else {
            dispatch(moviesActions.searchMovieByGenres({selGenres,page:query.get('page')}))
        }
    }, [dispatch, query, keyWord,selGenres])


    useEffect(()=>{
        dispatch(genresActions.getAll())
    },[])



    const submit = async (keyWord) => {
        setQuery(query=>({page:1}))
        setSelectedGenres([])
        dispatch(moviesActions.setSelectedGenres(null))



        await dispatch(moviesActions.setKeyWord(keyWord))
        reset()
    };


    const handleCheckboxChange = (e) => {
        const genreId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genreId]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }
    };


    const submitGenres = () => {
        setQuery(query=>({page:1}))



        dispatch(moviesActions.setSelectedGenres(selectedGenres));



        if(keyWord){
        dispatch(moviesActions.setKeyWord(null))
        }
    };


    function unChek() {
        setSelectedGenres([])
    }


    return (
        <div>


            <div>
                <button disabled={+query.get('page') === 1}
                        onClick={() => setQuery(query => ({page: +query.get('page') - 1}))}>Prev Page
                </button>

                <button disabled={+query.get('page') === total_pages}
                        onClick={() => setQuery(query => ({page: +query.get('page') + 1}))}>Next Page
                </button>
            </div>



            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'SearchMovie'} {...register('keyWord')}/>
                <button>SearchMovie</button>
            </form>



            <form onSubmit={handleSubmit(submitGenres)}>
                {genres.map((genre) => (
                    <div key={genre.id}>
                        <input
                            type="checkbox"
                            value={genre.id}
                            checked={selectedGenres.includes(genre.id)}
                            onChange={handleCheckboxChange}
                        />
                        <label>{genre.name}</label>
                    </div>
                ))}

                <button>Discover Movies With Checked Genres</button>

                <button disabled={selectedGenres.length < 1} onClick={() => unChek()}>RESET</button>
            </form>



            <div className={css.MoviesList}>
                {movies.map((movie) => <MovieInfo key={movie.id} movie={movie}/>)}
            </div>


        </div>
    );
};

export {MoviesList};



