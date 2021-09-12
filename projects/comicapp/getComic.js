export const getComic = (id) => 
    fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${i}`)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
    })