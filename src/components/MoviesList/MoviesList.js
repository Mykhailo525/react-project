import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'


const MoviesList = () => {


    const{movies,page}=useSelector(state => state.movies)
    // const dispatch=useDispatch()
    // const[query,setQuery]=useSearchParams({page:'1'})
    //
    //
    // useEffect(()=>{
    //     dispatch(moviesActions.getAll({page:query.get('page')}))
    // },[dispatch,query])




    return (
        <div>
            {/*<div>*/}
            {/*    <button disabled={page===1} onClick={()=>setQuery(query=>({page:+query.get('page')-1}))}>prev</button>*/}
            {/*    <button disabled={page===500} onClick={()=>setQuery(query=>({page:+query.get('page')+1}))}>next</button>*/}
            {/*</div>*/}

            <div className={css.MoviesList}>
            {movies.map((movie,index)=><MovieInfo key={index+1} movie={movie}/>)}
            </div>
        </div>
    );
};

export {MoviesList};