import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../../services";

const initialState={
    movies:[],
    total_pages:1,
    searchedMovies:[]
}



const getAll=createAsyncThunk(
    'moviesSlice/getAll',
    async ({page},{rejectedWithValue})=>{
        try {
            const {data}=await moviesService.getAll(page)
            return data

        }catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const getById=createAsyncThunk(
    'moviesSlice/getById',
    async ({id},{rejectedWithValue})=>{
        try {
            const {data}=await moviesService.getById(id)
            return data

        }catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);


const searchMovie=createAsyncThunk(
    'moviesSlice/searchMovie',
    async ({keyWord},thunkAPI)=>{
        try {
            const {data}=await moviesService.searchMovie(keyWord)
            return data
        }catch (e) {
            return thunkAPI.rejectWithValue(e.return.data)
        }
    }
);




const moviesSlice=createSlice({
    name:'moviesSlice',
    initialState,
    reducers:{

    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {results,total_pages} = action.payload
                state.movies = results
                state.total_pages=total_pages
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.movieById = action.payload
            })
            .addCase(searchMovie.fulfilled, (state, action) => {
                const {results,total_pages} = action.payload
                state.searchedMovies = results
                state.total_pages=total_pages
            })
})


const{reducer:moviesReducer}=moviesSlice

const moviesActions={
    getAll,
    getById,
    searchMovie
}

export {
    moviesReducer,moviesActions
}