import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {MoviesListCard} from "../components";

const MovieDataPage = () => {

    const{movieId}=useParams()

    const navigate=useNavigate()

    return (
        <div>
            <button onClick={()=>navigate(-1)}>Back</button>
            <MoviesListCard  movieId={movieId}/>
        </div>
    );
};

export {MovieDataPage};