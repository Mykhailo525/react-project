import axios from "axios";
import {baseURL} from "../configs";


const axiosService=axios.create({baseURL})


axiosService.interceptors.request.use((config)=>{
    config.headers.Authorization =`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODUxM2RjNGRiMDZhNGVjMTBlNjNmZmM1NjcxN2E0YSIsInN1YiI6IjYzZjQ5NzJhYTI0YzUwMTMxNmYwYWU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WesG_DN4YHAz9VgNujPBRohJsdx42frFab2aF4uE_ec`
    return config
})

export {
    axiosService
}