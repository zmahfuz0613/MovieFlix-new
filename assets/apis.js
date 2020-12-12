const API_KEY = '52db4bf55d0c3e274cddec874e8cce74';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=52db4bf55d0c3e274cddec874e8cce74';



function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=52db4bf55d0c3e274cddec874e8cce74`;
  return url;
}

// Create more section of the movies e.g TV SHOWS, LATEST MOVIES, UPCOMING MOVIES, etc.


function sectionMovies(url, onComplete, onError) {
  
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError)

}


// Get Popular Movies
function getPopularMovies() {

  const path = '/movie/popular';

  const url = generateUrl(path);

  const render = renderMovies.bind({title: 'Popular On Movie Flix'});

  sectionMovies(url, render, handleError);

}



// Get upcoming Movies
function getUpcomingMovies() {

  const path = '/movie/upcoming';

  const url = generateUrl(path);

  const render = renderMovies.bind({title: 'Upcoming Movies'});

  sectionMovies(url, render, handleError);

}


// Get Top Rated Movies

function getTopRatedMovies() {

  const path = '/movie/top_rated';

  const url = generateUrl(path);

  const render = renderMovies.bind({title: 'Top Rated Movies'});

  sectionMovies(url, render, handleError);

}

// Get Now Playing Movies
function getNowPlayingMovies() {

  const path = '/movie/now_playing';

  const url = generateUrl(path);

  const render = renderMovies.bind({title: 'Now Playing Movies'});

  sectionMovies(url, render, handleError);


}


// Search movies
// Instead of seraching just one movie we can write this function to search movies from all the sectiopns we created above using sectionMovies function.
// This will make it easier to search for movies when we will click the search button below and eliminate entire fetch and cath method and use searchMovie(value)

function searchMovie(value) {

  const path = '/search/movie';

  const url = generateUrl(path) + '&query=' + value;

  const render = renderMovies.bind({title: 'Results'});

  sectionMovies(url, render, handleError);

}

//Search movie 
function getMovieById(movieId){
  const path = `/movie/${movieId}`
  const url = generateUrl(path)

  fetch(url)
    .then((resource) => resource.json())
    .then((data) => createMovieDataTemplate(data))  
    .catch((error) => {
      console.log('Error: ', error)
    })
}


//Search trailers 
function getMovieTrailersById(movieId){
    const path = `/movie/${movieId}/videos`
    const url = generateUrl(path)
  
    fetch(url)
      .then((resource) => resource.json())
      .then((data) => createVideoTemplate(data))  
      .catch((error) => {
        console.log('Error: ', error)
      })
  }
  