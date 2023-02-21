import React from 'react';

import {Route, Routes} from "react-router-dom"
import {MainLayout} from "./layouts";
import {MoviesPage} from "./pages";



const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>

                <Route path={'movies'} element={<MoviesPage/>}/>


            </Route>

        </Routes>
    );
};

export {App};