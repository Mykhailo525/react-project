import React, {useEffect, useState} from 'react';
import {moviesService} from "../../services/moviesService";

const MoviesListCard = ({movieId}) => {

    const [movie,setMovie]=useState()

    useEffect(()=>{
        moviesService.getById(movieId).then(({data})=>setMovie(data))
    },[])



    return (
        <div>
            {movie && <div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" className={'movie__poster'}/>
                    <p>{movie.overview}</p>
                </div>
            </div>}
        </div>
    );
};

export {MoviesListCard};