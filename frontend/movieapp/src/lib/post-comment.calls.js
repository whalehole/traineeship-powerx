import axios from "axios";

export const postComment = (comment, accessToken) => 
    axios.post(`https://ecomm-service.herokuapp.com/movie/comment`, comment, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(res=>{
        console.log(comment);
        console.log("POSTED COMMENT: ", res.data);
        return res.data
    });