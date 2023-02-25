import React from 'react';
import {useNavigate} from "react-router-dom";
import css from "./MovieInfo.module.css"
import StarRatings from "react-star-ratings/build/star-ratings";




const MovieInfo = ({movie}) => {

    const {id, original_title, poster_path,vote_average} = movie

    const stars=vote_average/2;

    const navigate = useNavigate()

    const functionNavigate=()=>{
        navigate(id.toString())
    }


    return (
        <a onClick={() => {functionNavigate()}} className={css.Movie}>

            <div className={css.MovieInfo}>
                {poster_path &&
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                                     alt="" className={'movie__poster'}/>}

                <div>{original_title}</div>

            </div>
            

            <StarRatings
                rating={stars}
                starRatedColor="blue"
                numberOfStars={5}
                name='rating'
            />


        </a>
    );
};

export {MovieInfo};