$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Function to fetch movie details based on movie ID
    function fetchMovieDetails(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                const movie = response.data;
                displayMovieDetails(movie);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    // Function to display movie details on the page
    function displayMovieDetails(movie) {
        const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'https://via.placeholder.com/200x300';
        const title = movie.title;
        const overview = movie.overview ? movie.overview : 'No overview available';
        const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';
        const rating = movie.vote_average;

        const movieContainer = $('#movieContainer');
        const movieHtml = `
            <div class="movie-details">
                <img src="${imageUrl}" alt="${title}" class="movie-poster">
                <div class="movie-info">
                    <h2>${title}</h2>
                    <p><strong>Release Date:</strong> ${releaseDate}</p>
                    <p><strong>Rating:</strong> ${rating}</p>
                    <p><strong>Overview:</strong> ${overview}</p>
                </div>
            </div>
        `;
        movieContainer.html(movieHtml);
    }

    // Extract movie ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Fetch and display movie details
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        console.error('No movie ID found in URL parameter');
    }
});
