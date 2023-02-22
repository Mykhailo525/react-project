import React from 'react';
import {Link} from "react-router-dom";

const MovieInfo = ({movie}) => {

    const {id,original_title}=movie

    return (
        <div>
            <div>id :{id}</div>
            <div>original_title :{original_title}</div>
            <Link to={id.toString()}>Movie info</Link>
        </div>
    );
};

export {MovieInfo};