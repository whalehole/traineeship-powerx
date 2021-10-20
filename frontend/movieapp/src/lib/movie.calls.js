import axios from "axios";

export const getMovie = (id) => 
    axios.get(`https://ecomm-service.herokuapp.com/movie/movie/${id}`)
    .then(res=>{
        console.log(id);
        console.log("MOVIE: ", res.data);
        return res.data
    });

