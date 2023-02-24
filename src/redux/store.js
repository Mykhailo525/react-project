import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {moviesReducer} from "./slices/moviesSlice";
import {genresReducer} from "./slices/genresSlice";



const rootReducer=combineReducers({
    movies:moviesReducer,
    genres:genresReducer

})

const setupStore =()=>configureStore({
    reducer:rootReducer
})

export {
    setupStore
}