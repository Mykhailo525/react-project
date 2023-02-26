import React, {useState} from 'react';
import css from "./Header.module.css"
import {Link} from "react-router-dom";
import {moviesActions} from "../../redux";
import {useDispatch} from "react-redux";
import {useTheme} from "../../hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon,faUser} from '@fortawesome/free-solid-svg-icons'


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
                <Link to={'/?page=1'} onClick={()=>{functionGenres();functionKeyWord()}}>Back to Popular Movies</Link>
            </div>



            <div>
                <button className={css.switchBtn} onClick={changeTheme}>
                    <span className={theme === 'dark'?css.btnTogleDark:css.btnTogleLight}>{theme === 'light'?<FontAwesomeIcon icon={faSun} />:<FontAwesomeIcon icon={faMoon} />}</span>
                </button>
            </div>


            <div className={css.User}>
                <FontAwesomeIcon icon={faUser} />
            </div>

        </div>
    );
};

export {Header};