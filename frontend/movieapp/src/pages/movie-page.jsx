import { useParams } from "react-router-dom";
import { getMovie } from "../lib/movie.calls";
import { getMovieComments } from "../lib/movie-comments.calls";
import { postComment } from "../lib/post-comment.calls";
import { useMutation, useQuery } from "react-query";
import { useRef } from "react";
import { useAuth } from "../lib/auth.state";
import CommentsFeed from "../components/comments-feed";

export default function MoviePage() {
    const params = useParams();

    const { data:movie, isLoading } = useQuery(["movie", params.movieId], (keys) => {
        const movieId = keys["queryKey"][1];
        const abortController = new AbortController;
        const request = getMovie(movieId, abortController.signal);
        request.cancel = () => abortController.abort();
        return request
    });

    return isLoading ? null : (
        <div>
            <h1>{params.movieId}</h1>
            <img src={movie.posterUrl} />
            <CommentsFeed sectionId={params.movieId} />
        </div>
    )
}