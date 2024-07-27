const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd'; // Replace with your new TMDB API key

function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = response.data;
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        document.getElementById('movie-container').innerText = 'Movie details not found. Please try again later.';
    }
}

function displayMovieDetails(movie) {
    const movieContainer = document.getElementById('movie-container');
    if (!movieContainer) {
        console.error('Movie container not found');
        return;
    }

    movieContainer.innerHTML = `
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const movieId = getMovieIdFromUrl();
    if (movieId) {
        console.log(`Movie ID from URL: ${movieId}`);
        fetchMovieDetails(movieId);
    } else {
        console.log('No movie ID found in URL.');
        document.getElementById('movie-container').innerText = 'Movie ID not found. Please try again later.';
    }
});
