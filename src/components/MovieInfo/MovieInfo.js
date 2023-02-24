import React from 'react';
import {useNavigate} from "react-router-dom";
import css from "./MovieInfo.module.css"


const MovieInfo = ({movie}) => {

    const {id, original_title, poster_path,vote_average,genres} = movie


    const navigate = useNavigate()

    const functionNavigate=()=>{
        navigate(id.toString())
    }


    return (
        <div className={css.Movie}>
            <div className={css.MovieInfo}>
                {poster_path &&
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                                     alt="" className={'movie__poster'}/>}
                <div>id :{id}</div>
                <div>vote_average :{vote_average}</div>
                <div>original_title :{original_title}</div>

            </div>

            <button onClick={() => {functionNavigate()}}>Movie info</button>
        </div>
    );
};

export {MovieInfo};