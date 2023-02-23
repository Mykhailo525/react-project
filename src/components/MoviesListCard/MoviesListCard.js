import React, {useEffect, useState} from 'react';
import {moviesService} from "../../services";


const MoviesListCard = ({movieId}) => {

   const[movie,setMovie]=useState(null)

    useEffect(()=>{
        moviesService.getById(movieId).then(({data})=>setMovie(data))
    },[])

    return (
        <div>
            {movie && <div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" className={'movie_poster'}/>
                    <p>{movie.overview}</p>
                </div>
            </div>}
        </div>
    );
};

export {MoviesListCard};