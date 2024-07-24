$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                const movie = response.data;
                fetchMovieTrailer(movie, movieId);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function fetchMovieTrailer(movie, movieId) {
        axios.get(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
            .then(response => {
                const trailers = response.data.results;
                const trailer = trailers.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                displayMovie(movie, trailer);
            })
            .catch(error => {
                console.error('Error fetching movie trailers:', error);
            });
    }

    function displayMovie(movie, trailer) {
        document.title = movie.title; // Set page title to movie title

        const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

        const movieContainer = $('#movieContainer');
        const movieHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <div class="movie-info">
                    <span>Release Date: ${movie.release_date}</span>
                    <span>Rating: ${movie.vote_average}</span>
                </div>
                <div id="trailerContainer" class="trailer-container">
                    ${trailerUrl ? `<iframe id="moviePlayerFrame" width="100%" height="400" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>` : '<p>No trailer available</p>'}
                </div>
                <button id="watchMovieBtn" class="button">Watch Movie</button>
                <button id="backToDetailsBtn" class="button">Back to Movie Details</button>
            </div>
        `;
        movieContainer.html(movieHtml);

        $('#loading-container').fadeOut(500);
        $('#content').fadeIn(500); // Show content container after loading

        // Attach event listener to the "Watch Movie" button
        $('#watchMovieBtn').click(function() {
            window.location.href = `play.html?id=${movie.id}`;
        });

        // Attach event listener to the "Back to Movie Details" button
        $('#backToDetailsBtn').click(function() {
            window.history.back(); // Go back to previous page
        });

        // Fullscreen toggle with F11 key
        $(document).on('keydown', function(e) {
            if (e.key === 'F11') {
                toggleFullScreen();
            }
        });

        function toggleFullScreen() {
            const iframe = document.getElementById('moviePlayerFrame');
            if (iframe.requestFullscreen) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    iframe.requestFullscreen();
                }
            }
        }
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
