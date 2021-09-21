(()=>{
    // loader element
    const loader = document.createElement('img');
    loader.classList.add('hidden');
    loader.classList.add("loader");
    loader.src = "https://thumbs.gfycat.com/CaringSpryAlbertosaurus-size_restricted.gif";
    // fetch comic
    const getComic = (id) => 
    fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${id}`)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
    })
    // load comic on page
    const appendComic = (index, num, parent) => {
        comicContainer.replaceChildren();
        let loading = 1;
        // loader
        loader.classList.remove('hidden');
        for (let i = 1; i <= num; i++) {
            const comic = document.createElement("div");
            comic.classList.add("container-comic");
            comic.key = i;
            parent.appendChild(comic);
        }
        const viewers = document.querySelectorAll(".container-comic");
        // load details
        viewers.forEach((viewer)=>{
            getComic(viewer.key+index-1)
            .then(data=>{
                // add image
                const image = document.createElement("img");
                viewer.append(image);
                image.src = `${data.img}`;
                image.classList.add("fit-container-image");
                // add info
                const info = document.createElement("div");
                const index = document.createTextNode(`#${data.num}`);
                info.append(index);
                const title = document.createTextNode(`Title: ${data.title}`);
                info.append(title);
                const descript = document.createTextNode(`Description: ${data.alt}`);
                info.append(descript);

                viewer.append(info);

                if (loading == num) {
                    loader.classList.add("hidden");
                } else {loading++};
            })
            .catch(err=>{
                console.log(err);
            })
        })
        return index
    }
    // when page first loads
    let comicContainer = document.querySelector("#comicsContainer");
    let numComicsOption = document.querySelector("#numComicsOption");
    let comicNumSubmit = document.querySelector("#comicNumSubmit");
    let comicNumInput = document.querySelector("#comicNumInput");
    let randomizeButton = document.querySelector("#randomizeButton");
    let prevButt = document.querySelector("#prevButt");
    let nextButt = document.querySelector("#nextButt");
    let currentComic = 1;
    appendComic(currentComic, 1, comicContainer);
    document.querySelector('#root').append(loader);
    // on selecting specific comic -> expect only 1 result else error
    comicNumSubmit.addEventListener("click", (e)=>{
        e.preventDefault();
        numComicsOption.value = 1;
        currentComic = appendComic(parseInt(comicNumInput.value), 1, comicContainer);
    })
    // on view mode change 
    numComicsOption.addEventListener("change", (e)=>{
        currentComic = appendComic(1, numComicsOption.value, comicContainer)
    })
    // on randomizing
    randomizeButton.addEventListener("click", (e)=>{
        currentComic = appendComic((Math.floor(Math.random() * 2500) + 1), numComicsOption.value, comicContainer);
    })
    // on forward or backward
    prevButt.addEventListener("click", (e)=>{
        currentComic = appendComic(currentComic-parseInt(numComicsOption.value), numComicsOption.value, comicContainer);
    })
    nextButt.addEventListener("click", (e)=>{
        currentComic = appendComic(currentComic+parseInt(numComicsOption.value), numComicsOption.value, comicContainer);
    })
})();