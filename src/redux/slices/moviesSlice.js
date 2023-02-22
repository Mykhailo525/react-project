import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../../services/moviesService";

const initialState={
    movies:[],
    page:1,
    selectedMovie:null
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
                const {page, results} = action.payload
                state.movies = results
                state.page = page

            })
})


const{reducer:moviesReducer}=moviesSlice

const moviesActions={
    getAll
}

export {
    moviesReducer,moviesActions
}