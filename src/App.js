import React from 'react';

import {Route, Routes} from "react-router-dom"
import {MainLayout} from "./layouts";
import {MovieDataPage, MoviesPage} from "./pages";



const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>

                <Route path={'movies'} element={<MoviesPage/>}/>
                <Route path={'movies/:movieId'} element={<MovieDataPage/>}/>


            </Route>

        </Routes>
    );
};

export {App};