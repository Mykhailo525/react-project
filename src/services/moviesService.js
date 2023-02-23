import {axiosService} from "./axiosService";
import {urls} from "../configs";

const moviesService={
    getAll:(page=1)=>axiosService.get(urls.movies,{params:{page}}),
    getById:(id)=>axiosService.get(`${urls.movieById}/${id}`),
    searchMovie:(keyWord)=>axiosService.get(`${urls.searchMovie}${keyWord}`)

}

export {
    moviesService
}