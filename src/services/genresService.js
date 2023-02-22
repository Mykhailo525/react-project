import {axiosService} from "./axiosService";
import {urls} from "../configs";

const genresService = {
    getGenres:()=>axiosService.get(urls.genres)
}

export {genresService}