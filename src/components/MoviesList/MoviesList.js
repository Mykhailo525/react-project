import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'
import {useForm} from "react-hook-form";


const MoviesList = () => {

    const{movies,total_pages,keyWord}=useSelector(state => state.movies)
    const dispatch=useDispatch()

    const[query, setQuery]=useSearchParams({page:'1'})


    useEffect(() => {
        if (!keyWord) {
            dispatch(moviesActions.getAll({page: query.get('page')}))

        } else {
            dispatch(moviesActions.searchMovie({keyWord, page: query.get('page')}))
        }
    }, [dispatch, query, keyWord])



    const {register, handleSubmit, reset} = useForm({
        mode: 'all',
    })


    const submit = async (keyWord) => {
        setQuery(query=>({page:1}))
        await dispatch(moviesActions.setKeyWord(keyWord))
        reset()
    };



    return (
        <div>

            <div>
                <button disabled={+query.get('page')===1} onClick={()=>setQuery(query=>({page:+query.get('page')-1}))}>Prev Page</button>
                <button disabled={+query.get('page')===total_pages} onClick={()=>setQuery(query=>({page:+query.get('page')+1}))}>Next Page</button>
            </div>



            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'SearchMovie'} {...register('keyWord')}/>
                <button>SearchMovie</button>
            </form>



            <div className={css.MoviesList}>

            {movies.map((movie,index)=><MovieInfo key={movie.id} movie={movie}/>)}

            </div>
        </div>
    );
};

export {MoviesList};