document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
            .then(response => response.json())
            .then(movie => displayMovieDetails(movie))
            .catch(error => console.error('Error fetching movie details:', error));
    }

    function displayMovieDetails(movie) {
        const movieContainer = document.getElementById('movieContainer');
        if (!movieContainer) {
            console.error('movieContainer element not found');
            return;
        }

        const trailerKey = movie.videos.results.length > 0 ? movie.videos.results[0].key : null;
        const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : '';

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
        movieContainer.innerHTML = movieHtml;

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
        document.getElementById('loading-container').style.display = 'none';
        document.getElementById('movieDetails').style.display = 'block';
    }

    function setupDetailsButton(movieId) {
        const detailsButton = document.querySelector('.details-button');
        if (detailsButton) {
            detailsButton.addEventListener('click', function() {
                fetchMovieDetails(movieId);
            });
        }
    }

    function createMovieItem(movie) {
        return `
            <div class="movie-item">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <button class="button details-button">View Details</button>
            </div>
        `;
    }

    function displayMovies(movies) {
        const movieGrid = document.querySelector('.movie-grid');
        if (!movieGrid) {
            console.error('movieGrid element not found');
            return;
        }

        movieGrid.innerHTML = movies.map(movie => createMovieItem(movie)).join('');

        // Setup details button event listeners
        movies.forEach(movie => setupDetailsButton(movie.id));
    }

    // Example function to fetch popular movies (you can change the endpoint as needed)
    function fetchPopularMovies() {
        fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                displayMovies(movies);
            })
            .catch(error => console.error('Error fetching popular movies:', error));
    }

    // Fetch and display popular movies on page load
    fetchPopularMovies();
});
