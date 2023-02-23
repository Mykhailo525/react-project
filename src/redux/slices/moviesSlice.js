import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../../services";

const initialState={
    movies:[],
    total_pages:1
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
})


const{reducer:moviesReducer}=moviesSlice

const moviesActions={
    getAll
}

export {
    moviesReducer,moviesActions
}