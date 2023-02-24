import React from 'react';

const Badges = ({genre}) => {
    const{name}=genre
    return (
        <div>
            <div> genre : {name}</div>
        </div>
    );
};

export {Badges};