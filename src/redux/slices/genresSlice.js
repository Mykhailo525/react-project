import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {genresService} from "../../services";

const initialState={
    genres:[],
};

const getAll=createAsyncThunk(
    'genresSlice/getAll',
    async (_,{rejectedWithValue})=>{
        try {
            const {data}=await genresService.getAll()
            return data

        }catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const genresSlice=createSlice({
    name:'genresSlice',
    initialState,
    reducers:{

        },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {genres} = action.payload
                state.genres = genres
            })


})


const {reducer:genresReducer}=genresSlice


const genresActions={
getAll
}

export {genresActions,genresReducer}