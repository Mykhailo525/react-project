import {axiosService} from "./axiosService";
import {urls} from "../configs";

const moviesService={
    getAll:(page=1)=>axiosService.get(urls.movies,{params:{page}}),

    getById:(id)=>axiosService.get(`${urls.movieById}/${id}`),

    searchMovie:(keyWord,page=1)=>axiosService.get(`${urls.searchMovie}?&query=${keyWord}&page=${page}`),
    getMoviesByGenres:(genres,page=1)=>axiosService.get(`${urls.movies}?&with_genres=${genres}&page=${page}`)

}

export {
    moviesService
}