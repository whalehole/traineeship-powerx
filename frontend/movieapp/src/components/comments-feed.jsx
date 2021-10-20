import { useQuery, useMutation } from "react-query";
import { getMovieComments } from "../lib/movie-comments.calls";
import { postComment } from "../lib/post-comment.calls";
import { useRef } from "react";
import { useAuth } from "../lib/auth.state";
import { useParams } from "react-router";

export default function CommentsFeed({sectionId}) {
    const auth = useAuth();
    const params = useParams();
    const comment = useRef();

    const { data:comments, isLoading } = useQuery(["movieComments", sectionId], (keys) => {
        const movieId = keys["queryKey"][1];
        const abortController = new AbortController;
        const request = getMovieComments(movieId, abortController.signal);
        request.cancel = () => abortController.abort();
        return request
    });

    const { mutate:commentAction, isLoading:isSending } = useMutation(commentObj => postComment(commentObj, window.localStorage.getItem("accessToken")));

    const handleSubmit = e => {
        console.log(auth.status);
        if (auth.status !== "authenticated")
            alert("please log in eh");
        e.preventDefault();
        commentAction(
            {
                rating: 5,
                movieId: params.movieId,
                content: comment.current.value
            }
        )
    }

    return isLoading ? null : (
        <div>
            {
                comments.map(comment=>{
                    return (
                        <div key={comment.movie}>
                            {comment.content}
                        </div>
                    )
                })
            }
            <label>Your comment:</label>
            <input ref={comment} type="text" className="border-4" />
            <button onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}