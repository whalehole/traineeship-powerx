import axios from "axios";

export const getMovieComments = (id) => 
    axios.get(`https://ecomm-service.herokuapp.com/movie/movie/${id}/comment`)
    .then(res=>{
        console.log(id);
        console.log("COMMENTS: ", res.data);
        return res.data
    });