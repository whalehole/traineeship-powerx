import axios from "axios";

export const getMovies = (page) => 
    axios.get(`https://ecomm-service.herokuapp.com/movie?page=${page}&limit=10`)
    .then(res=>{
        console.log(page);
        console.log("MOVIES: ", res.data);
        return res.data
    });

