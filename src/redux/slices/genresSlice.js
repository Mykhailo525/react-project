import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {genresService} from "../../services";


const initialState = {
    genres:[],
    selectedGenre:null
}

const getGenres = createAsyncThunk(
    'genresSlice/getGenres',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await genresService.getGenres()
            return data
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const genresSlice=createSlice({
    name:'genresSlice',
    initialState,
    reducers:{setGenre:(state, action)=>{
            state.selectedGenre = action.payload

        }
        },
    extraReducers:builder =>
        builder
            .addCase(getGenres.fulfilled, (state, action)=>{
                state.genres = action.payload.genres

            })
})

const {reducer:genresReducer, actions:{setGenre}} = genresSlice

const genresActions = {
    setGenre,
    getGenres
}

export {genresReducer, genresActions}