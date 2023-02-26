import {axiosService} from "./axiosService";
import {urls} from "../configs";



const genresService={
    getAll:()=>axiosService.get(urls.genres)
}



export {genresService}