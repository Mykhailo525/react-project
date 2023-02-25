import React, {useEffect, useState} from 'react';
import {moviesService} from "../../services";
import {Badges} from "../Badges/Badges";




const MoviesListCard = ({movieId}) => {

   const[movie,setMovie]=useState(null)


    useEffect(()=>{
        moviesService.getById(movieId).then(({data})=>setMovie(data))
    },[movieId])







    return (
        <div>
            {
                movie && <div>
                    <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" className={'movie_poster'}/>
                    <p>{movie.overview}</p>
                </div>


            <div>
                {movie.genres.map((genre,index)=><Badges key={index+1} genre={genre}/>) }
            </div>

            </div>
            }



        </div>
    );
};

export {MoviesListCard};