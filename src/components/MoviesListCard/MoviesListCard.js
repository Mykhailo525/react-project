import React, {useEffect, useState} from 'react';
import {moviesService} from "../../services";
import {Badges} from "../Badges/Badges";
import {useNavigate} from "react-router-dom";
import css from "./MovieListCard.module.css"



const MoviesListCard = ({movieId}) => {

   const[movie,setMovie]=useState(null)

    useEffect(()=>{
        moviesService.getById(movieId).then(({data})=>setMovie(data))
    },[movieId])


    const navigate=useNavigate()


    return (
        <div className={css.GeneralBlock}>
            <button onClick={() => navigate(-1)}>Go Back</button>

            {
                movie && <div>


                    <div className={css.PosterAndAnotherItems}>



                        <div>
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt=""
                                 className={'movie_poster'}/>
                        </div>




                        <div className={css.BadgesAndAnother}>
                            <div className={css.Badges}>
                                {movie.genres.map((genre, index) => <Badges key={index + 1} genre={genre}/>)}
                            </div>




                            <div>

                                <div>
                                    <div>Release date : {movie.release_date}</div>
                                    <div>Budget : {movie.budget}</div>
                                    <div>Original title : {movie.original_title}</div>
                                </div>



                                <div><p>Fragment of the film:</p>
                                    <img src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} alt=""
                                         className={'movie_backdrop'}/>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div><p>Description : {movie.overview}</p></div>

                </div>
            }

        </div>
    );
};

export {MoviesListCard};