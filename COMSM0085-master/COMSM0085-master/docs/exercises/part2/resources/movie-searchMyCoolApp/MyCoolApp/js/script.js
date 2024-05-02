

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
// const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=39847290dee6c68d3e6c90b9b90ee4ae&query="'
// const API_URL_HOME = 'https://api.themoviedb.org/3/discover/movie?api_key=39847290dee6c68d3e6c90b9b90ee4ae& \
//                    include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        
const SEARCH_API = "{{SEARCH_API}}";
const API_URL_HOME = "{{API_URL_HOME}}";
                 
const main =  document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function getMovies(url) {

   const apiRes = await fetch(url);
   const resJson = await apiRes.json();

   if (!apiRes.ok) {
       console.error("Error fetching movies: ", apiRes.statusText);
   }
   showMovies(resJson.results);
}


function showMovies(movies) {
   main.innerHTML = ''

   movies.forEach((movie) => {
       const { title, poster_path, vote_average, overview } = movie

       const movieEl = document.createElement('div')
       movieEl.classList.add('movie')

       movieEl.innerHTML = `
           <img src="${IMG_PATH + poster_path}" alt="${title}">
           <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
         <h3>Overview</h3>
         ${overview}
       </div>
       `
       main.appendChild(movieEl)
   })
}

function getClassByRate(vote) {
   if (vote >= 8) {
       return ".movie-info blue";
   } else if (vote >= 5) {
       return ".movie-info black"
   } else return ".movie-info orange";
}

// Get initial movies
getMovies(API_URL_HOME);

form.addEventListener('submit', (e) => {
   e.preventDefault()

   const searchTerm = search.value // we create a var with the search term

   if(searchTerm && searchTerm !== '') { // and if the term exists
       getMovies(SEARCH_API + searchTerm);

       search.value = ''
   } else {
       window.location.reload();
   }
})