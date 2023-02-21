import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../../services/moviesService";

const initialState={
    movies:[],
    prev:null,
    next:null
}

const getAll=createAsyncThunk(
    'carsSlice/getAll',
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
            .addCase(getAll.fulfilled,(state, action)=>{
                const{prev,next,results}=action.payload
                state.movies=results
                state.prev=prev
                state.next=next
            })
})


const{reducer:moviesReducer,actions:{}}=moviesSlice

const moviesActions={
    getAll
}

export {
    moviesReducer,moviesActions
}