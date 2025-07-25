adocument.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
            .then(response => response.json())
            .then(movie => displayMovieDetails(movie))
            .catch(error => console.error('Error fetching movie details:', error));
    }

    function displayMovieDetails(movie) {
        const movieContainer = document.getElementById('movieDetails');
        if (!movieContainer) {
            console.error('movieDetails element not found');
            return;
        }

        const trailerKey = movie.videos.results.length > 0 ? movie.videos.results[0].key : null;
        const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : '';

        const movieHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div class="trailer-container">
                    ${trailerUrl ? `<iframe width="100%" height="615" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>` : '<p>No trailer available.</p>'}
                </div>
                <div class="movie-info">
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average}</p>
                    <p><strong>Overview:</strong> ${movie.overview}</p>
                </div>
                <button class="button back-button">Back</button>
                <button id="watchNowBtn" class="button">Watch Now!</button>
            </div>
        `;
        movieContainer.innerHTML = movieHtml;

        // Hide the loading screen and show movie details
        hideLoadingScreen();

        // Add click event to the "Watch Now" button
        document.getElementById('watchNowBtn').addEventListener('click', function() {
            window.location.href = `play.html?id=${movie.id}`;
        });

        // Add click event to the "Back" button
        document.querySelector('.back-button').addEventListener('click', function() {
            window.history.back(); // Go back to previous page
        });
    }

    function hideLoadingScreen() {
        const loadingContainer = document.getElementById('loading-container');
        const movieDetails = document.getElementById('movieDetails');
        if (loadingContainer) loadingContainer.style.display = 'none';
        if (movieDetails) movieDetails.style.display = 'block';
    }

    function getMovieIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const movieId = getMovieIdFromUrl();
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        document.getElementById('movieDetails').innerHTML = '<p>No movie ID provided.</p>';
    }
});
