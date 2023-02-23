import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'


const MoviesList = () => {

    const{movies,total_pages,searchedMovies}=useSelector(state => state.movies)
    const dispatch=useDispatch()
    const[query, setQuery]=useSearchParams({page:'1'})


    console.log(searchedMovies);


    useEffect(()=>{
        dispatch(moviesActions.getAll({page:query.get('page')}))
    },[dispatch,query])





    return (
        <div>

            <div>
                <button disabled={+query.get('page')===1} onClick={()=>setQuery(query=>({page:+query.get('page')-1}))}>Prev</button>
                <button disabled={+query.get('page')===total_pages} onClick={()=>setQuery(query=>({page:+query.get('page')+1}))}>Next</button>
            </div>

            <div className={css.MoviesList}>

            {movies.map((movie,index)=><MovieInfo key={movie.id} movie={movie}/>)}

            </div>
        </div>
    );
};

export {MoviesList};