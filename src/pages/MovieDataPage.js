import React from 'react';
import {useParams} from "react-router-dom";
import {MoviesListCard} from "../components";

const MovieDataPage = () => {

    const{movieId}=useParams()


    return (
        <div>
            <MoviesListCard  movieId={movieId}/>
        </div>
    );
};

export {MovieDataPage};