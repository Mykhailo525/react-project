import React from 'react';
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";

import {moviesActions} from "../../redux";
import {useDispatch} from "react-redux";



const Header = () => {

     const dispatch=useDispatch()

    return (
        <div className={css.Header}>
            <div>
                <NavLink to={'/?page=1'} onClick={()=>dispatch(moviesActions.setKeyWord(null))}>Back to all Movies</NavLink>
            </div>

        </div>
    );
};

export {Header};