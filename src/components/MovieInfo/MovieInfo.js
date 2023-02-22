import React from 'react';
import {Link,useNavigate} from "react-router-dom";
import css from "./MovieInfo.module.css"




const MovieInfo = ({movie}) => {

const navigate=useNavigate()

    const {id,original_title,poster_path}=movie

    return (
        <div className={css.Movie}>
            <div>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" className={'movie__poster'}/>
                <div>id :{id}</div>
                <div>original_title :{original_title}</div>
            </div>

            <button onClick={()=>navigate(id.toString())}>Movie info</button>
           {/*<Link to={id.toString()}>Movie info</Link>*/}
        </div>
    );
};

export {MovieInfo};