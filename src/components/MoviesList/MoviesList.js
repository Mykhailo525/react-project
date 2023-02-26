import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";


import {MovieInfo} from "../MovieInfo/MovieInfo";
import css from './MoviesList.module.css'
import {genresActions} from "../../redux";
import {moviesActions} from "../../redux";




const MoviesList = () => {

    const {register, handleSubmit,reset} = useForm({
        mode: 'all',
    })

    const{movies,total_pages,keyWord,selGenres,loading}=useSelector(state => state.movies)

    const{genres}=useSelector(state => state.genres)


    const dispatch=useDispatch()

    const[query, setQuery]=useSearchParams({page:'1'})




    useEffect(() => {
        if (!keyWord && !selGenres) {

            //Якщо не введено ключове слово для пошуку або не обрані жанри то виводяться всі фільми
            dispatch(moviesActions.getAll({page: query.get('page')}))
        } else if(!selGenres) {

            //Якщо не вибрано жанри то виводяться фільми за вказаною назвою
            dispatch(moviesActions.searchMovie({keyWord, page: query.get('page')}))
        }else{

            //Виводяться фільми за вказаним жанром або жанрами
            dispatch(moviesActions.searchMovieByGenres({selGenres,page:query.get('page')}))
        }
    }, [query, keyWord,selGenres])


    useEffect(()=>{
        dispatch(genresActions.getAll())
    },[])




    //Функція яка відпрацьовує для пошуку по слову (вказую редірект на 1 сторінку бо наприклад коли знаходишся
    // на 5 сторнці по фільмах "Аватар" і робиш пошук "Plane" то відобразить 5 сторінку "Plane")
    //ОБНУЛЯЄ МАСИВ ФІЛЬМІВ ЩОБ ЗАПИСАТИ В НЬОГО ФІЛЬМИ ПО ЗАДАНОМУ СЛОВУ
    //Забирає галочки з обраних чекбоксів
    //Обнуляє раніше задані жанри (якщо вони були)
    //Передає ключове слово в moviesSlice

    const submit =(keyWord) => {
        setQuery(query=>({page:1}))
        setSelectedGenres([])
        dispatch(moviesActions.setNullToMovies([]))
        if(selGenres){
        dispatch(moviesActions.setSelectedGenres(null))
        }
        dispatch(moviesActions.setKeyWord(keyWord))
        reset()
    };





    //Функція записує обрані чекбокси жанрів в масив який потім передаю в moviesSlice

    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleCheckboxChange = (e) => {
        const genreId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genreId]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }
    };



    //Функція яка відпрацьовує для пошуку по жанрах
    //ОБНУЛЯЄ МАСИВ ФІЛЬМІВ ЩОБ ЗАПИСАТИ В НЬОГО ФІЛЬМИ ПО ЗАДАНИХ ЖАНРАХ
    //Обнуляє раніше задане слово (якщо воно було)
    //Передає обрані жанри в moviesSlice

    const submitGenres = () => {
        setQuery(query=>({page:1}))
        dispatch(moviesActions.setNullToMovies([]))
        if(keyWord){
        dispatch(moviesActions.setKeyWord(null))
        }
        dispatch(moviesActions.setSelectedGenres(selectedGenres));
    };





    {/*Функція для обнулення чекбоксів для пошуку жанрів*/}

    function unChek() {
        setSelectedGenres([])
    }




    {/*Винесені з кнопок функції для переходу по сторінках*/}

    const prevPage=()=>{
        setQuery(query => ({page: +query.get('page') - 1}))
        dispatch(moviesActions.setNullToMovies([]))
    }
    const nextPage=()=>{
        setQuery(query => ({page: +query.get('page') + 1}))
        dispatch(moviesActions.setNullToMovies([]))
    }




    return (
        <div className={css.Block}>


            <div className={css.Wrapper}>
                <div className={css.FormKeyWord}>




                    {/*Форма для пошуку по ключовому слову*/}

                    <h2>Search Movie</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder={'Movie name'} {...register('keyWord',)}/>
                        <button>Search</button>
                    </form>

                </div>




                {/*Форма для пошуку по заданих жанрах*/}

            <form className={css.Form} onSubmit={handleSubmit(submitGenres)}>
                <div className={css.InputCheckBox}>
                {genres.map((genre) => (
                    <div className={css.FormDiv} key={genre.id}>
                        <input className={css.CheckBox}
                            type="checkbox"
                            value={genre.id}
                            checked={selectedGenres.includes(genre.id)}
                            onChange={handleCheckboxChange}
                        />
                        <label className={css.Label}>{genre.name}</label>
                    </div>
                ))}
                </div>

                <div className={css.GenreButtons}>
                <button disabled={selectedGenres.length===0}>Discover Movies With Checked Genres</button>
                <button disabled={selectedGenres.length < 1} onClick={() => unChek()}>RESET</button>
                </div>

            </form>

            </div>





            {loading && <h2>Loading................</h2>}




            <div className={css.MoviesList}>
                {movies.length>0 && movies.map((movie,index) => <MovieInfo key={index+1} movie={movie}/>)}
            </div>





            {/*Перевірка чи є фільми по заданих жанрах або ключовому слову */}

            {(!loading && movies.length===0) &&
                <div className={css.AlertNotFound}>
                    <p>No movies found for your request, try something else</p>
                </div>}





            {/*Кнопки для переходу по сторінках */}

            {
                (!loading && movies.length!==0)&&

                <div className={css.PageButtons}>

                    <button disabled={+query.get('page') === 1}
                            onClick={() => prevPage()}>Prev Page
                    </button>

                    <button disabled={+query.get('page') === total_pages || total_pages < 2}
                            onClick={() => nextPage()}>Next Page
                    </button>

                </div>
            }


        </div>
    );
};

export {MoviesList};



