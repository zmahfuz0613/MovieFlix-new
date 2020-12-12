const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const moviesResult = document.querySelector('#MoviesResult');
const categories = document.querySelector('#Categories');
const movieDetail = document.querySelector('#MovieDetail');
const movieDetailPoster = document.querySelector('#MovieDetailPoster');
const movieDetailInformation = document.querySelector('#MovieDetailInformation');
const movieDetailTrailers = document.querySelector('#MovieDetailTrailers');
const movieFlixMenu = document.querySelector('#MovieFlixMenu');
const popularMenu = document.querySelector('#PopularMenu');
const topMenu = document.querySelector('#TopMenu');
const nowPlayingMenu = document.querySelector('#NowPlaying');



/*Slider*/

window.onload  = function(){
  
  
  getAllMovies();
}


function getAllMovies(){
  cleanCategoryContainer();
  getTopRatedMovies();
  getNowPlayingMovies();
  getPopularMovies();
  getUpcomingMovies();
}


function renderLatest(movie){
  
  categories.innerHTML += createCategory([movie], this.title);

}

function renderMovies(data) {  
  
  categories.innerHTML += createCategory(data.results, this.title);

}


function createCategory(movies, title) {

  let categoryHtml =  `<div>
        <ul class="flex-container">
          <li class="flex-title-item">${title}</li>
        </ul>
        <ul class="flex-container">`;

  categoryHtml += createMovies(movies);
  categoryHtml += `</ul></div>`;

  return categoryHtml;
}


function createMovies(movies){
  
  let moviesHtml = '';
  if(movies != null){
      movies.map((movie) => {
      if (movie.poster_path) {
        moviesHtml +=  `<li class="flex-item"><img src="${IMAGE_URL + movie.poster_path}" data-movie-id="${movie.id}" onclick="showMovieDetail(${movie.id})"/></li>`;
      }
  
    });
  }

  return moviesHtml;
}

function showMovieDetail(movieId){
  debugger;
  categories.style.display = 'none';
  movieDetail.style.display = 'block';
  getMovieById(movieId);
  getMovieTrailersById(movieId);  
}


function createMovieDataTemplate(data){

  if(movieDetailPoster.childElementCount>0){
    movieDetailPoster.removeChild(movieDetailPoster.childNodes[0]); 
  }
  if(movieDetailInformation.childElementCount>0){
    movieDetailInformation.removeChild(movieDetailInformation.childNodes[0]); 
  }
  debugger;
    //Poster    
    const poster = createMoviePoster(data);    
    movieDetailPoster.appendChild(poster);

    //Information   
    const information = createMovieInformation(data);    
    movieDetailInformation.appendChild(information);  

}

// Display movie Videos, Creating the content and pushed the movie data in this function.
// Over write everything with 'x' 
// No more than 4 videos will be displayed and created the Iframe and dump the iframe in the webpage.

function createVideoTemplate(data) {
  //Trailers
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  
  const trailerContainer = document.createElement('div');
  const trailers = document.createElement('h2');
  trailers.innerHTML = length > 0 ? 'Trailers' : '';
  trailerContainer.appendChild(trailers);

  for (let i = 0; i < length; i++) {
  const video = videos[i];
  const iframe = createIframe(video);
  trailerContainer.appendChild(iframe);   
     
  }

  if(movieDetailTrailers.childElementCount>0){
    movieDetailTrailers.removeChild(movieDetailTrailers.childNodes[0]); 
  };
  movieDetailTrailers.appendChild(trailerContainer);
}


// New Function to embed the video trailer 

function createIframe(video) {
  
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 250;
  iframe.height = 218;
  iframe.allowFullscreen = true;

  return iframe;

}


//Create movie information

function createMovieInformation(movie){
  const informationContainer = document.createElement('div');
  informationContainer.classList.add('movie-content');
  //Title
  const title = document.createElement('h1');
  title.innerHTML = `${movie.title} (${movie.release_date})`;
  informationContainer.appendChild(title);
  
  //Overview
  const overView = document.createElement('h5');
  overView.innerHTML = `${movie.overview}`;
  informationContainer.appendChild(overView);

  //Genres
  const genre = document.createElement('h2');
  genre.classList.add('movie-information');
  let genreHtml = '';
  for(var i = 0; i < movie.genres.length; i++){
    genreHtml += movie.genres[i].name + ', ';
  }
  genreHtml = genreHtml.substring(0, genreHtml.length-2);

  genre.innerHTML = `Genres: ${genreHtml}`;
  informationContainer.appendChild(genre);  

  //Vote average
  const voteAverage = document.createElement('h2');
  voteAverage.classList.add('movie-information');
  voteAverage.innerHTML = `Vote average: ${movie.vote_average}`;
  informationContainer.appendChild(voteAverage);
  return informationContainer;
}

//Create movie poster
function createMoviePoster(movie){
  const posterContainer = document.createElement('div');
  posterContainer.classList.add('movie-thumb');
  const img = document.createElement('img');
  img.src = `${IMAGE_URL + movie.poster_path}`;
  img.alt = movie.original_title;
  img.width = 300;
  img.height = 450;
  posterContainer.appendChild(img);
  return posterContainer;
}



// incase there is an error we creating the error function

function handleError(error) {
  console.log('Error: ', error)
}


function cleanCategoryContainer(){
  categories.innerHTML = '';
  categories.style.display = 'block';
  movieDetail.style.display = 'none';
}

//Search movie
buttonElement.onclick = function (e) {
  
  e.preventDefault()
  const value = inputElement.value;
  cleanCategoryContainer();
  if(value != ''){  
    searchMovie(value);
  }
  else{
    getAllMovies();
  }
  inputElement.value = '';
  
}


//MovieFlix menu
movieFlixMenu.onclick = function (e) {
  
  e.preventDefault()
 
  getAllMovies();  

  return false;
}

//Top menu
topMenu.onclick = function (e) {
  
  e.preventDefault()
  cleanCategoryContainer();
  getTopRatedMovies();  

  return false;
}

//Popular menu
popularMenu.onclick = function (e) {
  
  e.preventDefault()
  cleanCategoryContainer();
  getPopularMovies();  

  return false;
}


//Latest menu
nowPlayingMenu.onclick = function (e) {
  
  e.preventDefault()
  cleanCategoryContainer();
  getNowPlayingMovies();  

  return false;
}
