import React from 'react';
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {moviesActions} from "../../redux";
import {useDispatch} from "react-redux";


const Header = () => {

        const {register, handleSubmit, reset} = useForm({
            mode: 'all',
        })


    const dispatch=useDispatch()


    const submit = async (keyWord) => {
        await dispatch(moviesActions.searchMovie(keyWord))
        reset()
    };

    return (
        <div className={css.Header}>
            <div>
                <NavLink to={'/'}>Movies</NavLink>

            </div>

            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'SearchMovie'} {...register('keyWord')}/>
                <button onSubmit={()=><NavLink to={'searchedFilms'}></NavLink>}>SearchMovie</button>
            </form>
        </div>
    );
};

export {Header};