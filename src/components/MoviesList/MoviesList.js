import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux";
import {Form, useSearchParams} from "react-router-dom";
import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'
import {useForm} from "react-hook-form";
import {genresActions} from "../../redux/slices/genresSlice";



const MoviesList = () => {

    const{movies,total_pages,keyWord,selGenres}=useSelector(state => state.movies)

    console.log(selGenres);


    const{genres}=useSelector(state => state.genres)

    const dispatch=useDispatch()

    const[query, setQuery]=useSearchParams({page:'1'})


    useEffect(() => {
        if (!keyWord && !selGenres ) {
            dispatch(moviesActions.getAll({page: query.get('page')}))

        } else if(!selGenres) {
            dispatch(moviesActions.searchMovie({keyWord, page: query.get('page')}))
        }else{
            dispatch(moviesActions.searchMovieByGenres({selGenres,page:query.get('page')}))
        }
    }, [dispatch, query, keyWord,selGenres])


    useEffect(()=>{
        dispatch(genresActions.getAll())
    },[])




    const {register, handleSubmit, reset} = useForm({
        mode: 'all',
    })




    // const submit = async (keyWord) => {
    //     setQuery(query=>({page:1}))
    //     await dispatch(moviesActions.setKeyWord(keyWord))
    //     reset()
    // };



    const submit = (data) => {

        const selectedGenres = Object.keys(data).filter(key => data[key]).map(key => key.replace('genre_', '')).join();
        console.log(selectedGenres);
        dispatch(moviesActions.setSelectedGenres(selectedGenres))
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


            {/*<form>*/}
            {/*    <ul>*/}
            {/*        {genres.map((genres) => (*/}
            {/*            <li key={genres.id}>*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    value={genres.id}*/}
            {/*                />*/}
            {/*                <label>{genres.name}</label>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}

            {/*    <button>Discover</button>*/}
            {/*</form>*/}




            <form onSubmit={handleSubmit(submit)}>
                <div>
                    {genres.map(genre => (<div key={genre.id}>
                        <div><input
                            type="checkbox" name={`genre_${genre.id}`}
                            {...register(`genre_${genre.id}`)}/>
                            {genre.name}</div>
                    </div>))}
                    <button type="submit">Save</button>
                </div>
            </form>



            <div className={css.MoviesList}>

            {movies.map((movie)=><MovieInfo key={movie.id} movie={movie}/>)}

            </div>
        </div>
    );
};

export {MoviesList};



// import React, {useEffect} from 'react';import {useDispatch, useSelector} from "react-redux";
// import {genresActions} from "../../redux/slices/genreSlice";import {useForm} from "react-hook-form";
//
// const MovieCheckbox = () => {
//     const {reset, register, handleSubmit} = useForm({mode: 'all'});
//     const {genresM, selectedGM} = useSelector(state => state.genresReducer);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(genresActions.getGenresM());
//     }, [])




    // const submit = (data) => {
    //     const selectedGenres = Object.keys(data).filter(key => data[key]).map(key => key.replace('genre_', ''));
    //     dispatch(genresActions.selectGM(selectedGenres))
    // };

//     return (
//         <form onSubmit={handleSubmit(submit)}>
//             <div>
//                 {genresM.genres?.map(genre => (<div key={genre.id}>
//                     <div><input
//                         type="checkbox" name={`genre_${genre.id}`}
//                         {...register(`genre_${genre.id}`)}/>
//                         {genre.name}</div>
//                 </div>))}
//                 <button type="submit">Save</button>
//             </div>
//         </form>)
// };
// export {MovieCheckbox};