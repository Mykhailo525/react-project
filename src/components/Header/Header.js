import {faSun, faMoon,faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import {moviesActions} from "../../redux";
import {useTheme} from "../../hooks";
import css from "./Header.module.css"


const Header = () => {

    const dispatch=useDispatch()

    const {theme, setTheme} = useTheme()



    const changeTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            localStorage.setItem('appTheme', 'light')
        } else {
            setTheme('dark')
            localStorage.setItem('appTheme', 'dark')
        }
    }




    const functionGoToPopularMovies=()=>{
        dispatch(moviesActions.setKeyWord(null))
        dispatch(moviesActions.setSelectedGenres(null))
        dispatch(moviesActions.setNullToMovies([]))

    }


    return (
        <div className={css.Header}>

            <div>
                <Link  to={'/?page=1'} onClick={()=>functionGoToPopularMovies()}>Back to Popular Movies</Link>
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