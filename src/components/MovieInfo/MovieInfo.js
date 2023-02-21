import React from 'react';

const MovieInfo = ({movie}) => {

    const {id,original_title}=movie

    return (
        <div>
            <div>id :{id}</div>
            <div>original_title :{original_title}</div>
        </div>
    );
};

export {MovieInfo};