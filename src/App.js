import React from 'react';

import {Route, Routes} from "react-router-dom"
import {MainLayout} from "./layouts";
import {MovieDataPage, MoviesPage} from "./pages";
import {MoviesList} from "./components";
import {SearchedFilms} from "./pages/SearchedFilms";



const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<MoviesPage/>}/>
                <Route path={'/:movieId'} element={<MovieDataPage/>}/>
                <Route path={'searchedFilms'} element={<SearchedFilms/>}/>



            </Route>

        </Routes>


    );
};

export {App};