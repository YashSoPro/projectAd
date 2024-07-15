$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
            .then(response => {
                const movie = response.data;
                displayMovieDetails(movie);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function displayMovieDetails(movie) {
        document.title = movie.title; // Set page title to movie title

        const trailerKey = movie.videos.results.length > 0 ? movie.videos.results[0].key : null;
        const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : '';

        const movieContainer = $('#movieContainer');
        const movieHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div class="trailer-container">
                    <iframe width="100%" height="615" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="movie-info">
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average}</p>
                    <p><strong>Overview:</strong> ${movie.overview}</p>
                </div>
                <button class="back-button">Back</button>
                <button id="watchNowBtn" class="button">Watch Now!</button>
            </div>
        `;
        movieContainer.html(movieHtml);

        hideLoadingScreen();

        // Add click event to the "Watch Now" button
        $('#watchNowBtn').click(function() {
            window.location.href = `play.html?id=${movie.id}`;
        });

        // Add click event to the "Back" button
        $('.back-button').click(function() {
            window.history.back(); // Go back to previous page
        });
    }

    function hideLoadingScreen() {
        $('#loading-container').fadeOut(500);
        $('#movieDetails').fadeIn(500);
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
