import React from 'react';
import css from "./Badges.module.css"


const Badges = ({genre}) => {

    const{name}=genre
    return (
        <div className={css.Badge}>
            {name}
        </div>
    );
};

export {Badges};