import axios from "axios";

export const getMarket = (page, limit) => 
    axios.get(`https://ecomm-service.herokuapp.com/marketplace?page=${page}&limit=${limit}`)
    .then(res=>{
        console.log(res.data);
        return res.data
    });

