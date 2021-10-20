import { getMovies } from "../lib/movies.calls"
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentsFeed from "../components/comments-feed";

export default function HomePage() {
    const [page, setPage] = useState(1);
    const { data, isLoading, ...otherQueryResult } = useQuery(["movies", page], (keys) => {
        const page = keys["queryKey"][1];
        const abortController = new AbortController;
        const request = getMovies(page, abortController.signal);
        request.cancel = () => abortController.abort();
        return request
    });

    const handlePrev = e => {
        setPage(page-1);
    }

    const handleNext = e =>{
        setPage(page+1);
    }
    
    return isLoading ? null : (
        <div>
            <button onClick={handlePrev}>PREV</button>
            <button onClick={handleNext}>NEXT</button>
            {console.log(data)}
            {
                data.map(movie=>{
                    return (
                        <div key={movie._id}>
                            <Link to={`/movie/${movie._id}`}>
                                <img src={movie.posterUrl} />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}