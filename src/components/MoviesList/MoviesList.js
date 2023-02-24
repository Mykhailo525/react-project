import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {Form, useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'
import {useForm} from "react-hook-form";
import {genresActions} from "../../redux/slices/genresSlice";
import {GenreInfo} from "../GenreInfo/GenreInfo";


const MoviesList = () => {

    const{movies,total_pages,keyWord,selGenres}=useSelector(state => state.movies)


    const{genres}=useSelector(state => state.genres)

    const dispatch=useDispatch()

    const[query, setQuery]=useSearchParams({page:'1'})


    useEffect(() => {
        if (!keyWord && !selGenres ) {
            dispatch(moviesActions.getAll({page: query.get('page')}))

        } else if(!selGenres){
            dispatch(moviesActions.searchMovie({keyWord, page: query.get('page')}))
        }else{
            dispatch(moviesActions.searchMovieByGenres({selGenres, page: query.get('page')}))
        }
    }, [dispatch, query, keyWord,selGenres])


    useEffect(()=>{
        dispatch(genresActions.getAll())
    },[])


    // const {register, handleSubmit, reset} = useForm({
    //     mode: 'all',
    // })


    // const submit = async (keyWord) => {
    //     setQuery(query=>({page:1}))
    //     await dispatch(moviesActions.setKeyWord(keyWord))
    //     reset()
    // };

    const [selectedGenres, setSelectedGenres] = useState([]);

    console.log(selectedGenres);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(moviesActions.setSelectedGenres(selectedGenres));
    };



    const handleCheckboxChange = (e) => {
        const genreId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genreId]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }
    };



    return (
        <div>

            <div>
                <button disabled={+query.get('page')===1} onClick={()=>setQuery(query=>({page:+query.get('page')-1}))}>Prev Page</button>
                <button disabled={+query.get('page')===total_pages} onClick={()=>setQuery(query=>({page:+query.get('page')+1}))}>Next Page</button>
            </div>



            {/*<form onSubmit={handleSubmit(submit)}>*/}
            {/*    <input type="text" placeholder={'SearchMovie'} {...register('keyWord')}/>*/}
            {/*    <button>SearchMovie</button>*/}
            {/*</form>*/}


            <form>
                <ul>
                    {genres.map((genres) => (
                        <li key={genres.id}>
                            <input
                                type="checkbox"
                                value={genres.id}
                                checked={selectedGenres.includes(genres.id)}
                                onChange={handleCheckboxChange}
                            />
                            <label>{genres.name}</label>
                        </li>
                    ))}
                </ul>

                <button onClick={()=>handleSubmit} >Discover</button>
            </form>



            {/*<div>*/}
            {/*    {genres.map((genre,index)=><GenreInfo key={index+1} genre={genre}/>)}*/}
            {/*</div>*/}



            <div className={css.MoviesList}>

            {movies.map((movie)=><MovieInfo key={movie.id} movie={movie}/>)}

            </div>
        </div>
    );
};

export {MoviesList};