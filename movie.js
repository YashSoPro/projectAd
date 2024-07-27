const apiKey = 'b9777c51aea4a211a9c6f0e839934890'; // Updated TMDB API key

document.addEventListener('DOMContentLoaded', () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    console.log('Movie ID from URL:', movieId);

    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        document.getElementById('movie-container').innerHTML = '<p>Movie ID not found. Please try again later.</p>';
        console.error('No movie ID found in URL.');
    }
});

async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = response.data;
        console.log('Movie fetched successfully');
        console.log('Movie:', movie);
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        document.getElementById('movie-container').innerHTML = '<p>Error fetching movie details. Please try again later.</p>';
    }
}

function displayMovieDetails(movie) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
    `;
}
