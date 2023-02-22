import React, {useEffect, useState} from 'react';
import {moviesService} from "../../services/moviesService";

const MoviesListCard = ({movieId}) => {

    const [movie,setMovie]=useState()

    useEffect(()=>{
        moviesService.getById(movieId).then(({data})=>setMovie(data))
    },[])


    return (
        <div>
            {JSON.stringify(movie)}
        </div>
    );
};

export {MoviesListCard};