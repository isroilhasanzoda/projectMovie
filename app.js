const API_KEY = "a1562d25-a8e4-4c59-9235-25498b1f93ed";
const API_URL ="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=Horror&page=1";
const API_URL_SEARCH =  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
 


getMovies(API_URL);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    })
    const respData = await resp.json()
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 6) {
        return "green"
    }
    else if (vote > 4) {
        return "orange"
    }
    else   {
        return "red"
    }
}


function showMovies(data) {
    const moviesE1 = document.querySelector(".movies");

     document.querySelector(".movies").innerHTML = ""

    data.films.forEach(movie => {
        const movieE1 = document.createElement("div")
        movieE1.classList.add("movie");
        movieE1.innerHTML =
        `<div class="movie_cover_inner">
                    <img src="${movie.posterUrlPreview}"
                     class="movier_cover" alt="${movie.nameEn}">
                     <div class="movie_cover_darkened"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameEn}  </div>
                    <div class="movie_category">${movie.genres.map(
                      (genre) => `${genre.genre}`
                    )}</div>
                    <div class="movie_average movie_average_${getClassByRate(
                      movie.rating
                    )} ">${movie.rating}</div>
                </div>`;
        
        movieE1.addEventListener("click", () => openModal(movie.filmId));
        moviesE1.appendChild(movieE1);
    })

}


const form = document.querySelector("form")
const search = document.querySelector(".header_search");



form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl)


        search.value = ""
    }
})



//modal

const modalEl = document.querySelector(".modal")

async function openModal(id) {
    const resp = await fetch(API_URL_MOVIE + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    
    modalEl.classList.add("modal__show");
    


    modalEl.innerHTML = `<div class="modal_card">
                    <img src="${
                      respData.posterUrl
                    }" class="modal_movie_backdrop" alt="">
                    <h2>
                    <span class="modal_movie_title">${respData.nameRu}</span>
                    <span class="modal_movie_realse_year>${respData.year}</span>
                    </h2>
                    <ul class="modal_movie_info">
                      <div class="loader"></div>
                      <li class="modal_movie_genre ">Жанр - ${respData.genres.map(
                        (el) => `<span>${el.genre}</span>`
    )}</li>
                       ${respData.filmLength ? `<li class="modal_movie_runtime "> Время - ${respData.filmLength} min</li>` : "" }
                      
                      <li>Сайт: <a class="modal_movie_site  href=${
                        respData.webUrl
                      }">${respData.webUrl}</a></li>
                      <li class="modal_movie_overview ">Описание - ${
                        respData.description
                      }</li>
                    </ul>
                    <button type="button" class="modal_button_close">Close</button>
  </div>`;
    
    const btnClose = document.querySelector(".modal_button_close");
    btnClose.addEventListener("click", () => closeModal())

}

function closeModal() {
    modalEl.classList.remove("modal_show")
}


// window.addEventListener("click", (e) => {

//     if (e.target === modalEl) {
//         closeModal()
//     }
// })

// window.addEventListener("keydown", (e) => {
//     if (e.keyCode === 27) {
//         modalEl.classList.remove("modal_show")
//     }
// })