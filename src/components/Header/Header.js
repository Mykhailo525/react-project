import React, {useState} from 'react';
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {moviesActions} from "../../redux";
import {useDispatch} from "react-redux";
import {useTheme} from "../../hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'


const Header = () => {

    const {theme, setTheme} = useTheme()

    const changeTheme = () =>{
        if (theme === 'dark'){
            setTheme('light')
            localStorage.setItem('appTheme', 'light')
        }else {
            setTheme('dark')
            localStorage.setItem('appTheme', 'dark')
        }
    }





     const dispatch=useDispatch()


    const functionKeyWord=()=>{
        dispatch(moviesActions.setKeyWord(null))
    }

    const functionGenres=()=>{
        dispatch(moviesActions.setSelectedGenres(null))
    }


    return (
        <div className={css.Header}>
            <div>
                <NavLink to={'/?page=1'} onClick={()=>{functionGenres();functionKeyWord()}}>Back to all Movies</NavLink>
            </div>

            <div>
                <button className={css.switchBtn} onClick={changeTheme}>
                    <span className={theme === 'dark'?css.btnTogleDark:css.btnTogleLight}>{theme === 'light'?<FontAwesomeIcon icon={faSun} />:<FontAwesomeIcon icon={faMoon} />}</span>
                </button>
            </div>

        </div>
    );
};

export {Header};