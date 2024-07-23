$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        $('#loading-container').fadeIn(); // Show loading screen
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                const movie = response.data;
                displayMovie(movie, movieId);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                $('#playerContainer').html('<p class="error-message">Failed to load movie details. Please try again later.</p>');
            })
            .finally(() => {
                $('#loading-container').fadeOut(); // Hide loading screen
            });
    }

    function displayMovie(movie, movieId) {
        document.title = movie.title; // Set page title

        const trailerUrl = `https://vidsrc.to/embed/movie/${movieId}`;
        const playerContainer = $('#playerContainer');
        const playerHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div id="trailerContainer" class="trailer-container">
                    <iframe id="moviePlayerFrame" width="100%" height="615" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
                </div>
                <button id="backToDetailsBtn" class="button">Back to Movie Details</button>
            </div>
        `;
        playerContainer.html(playerHtml).fadeIn(500); // Show player container

        $('#backToDetailsBtn').click(function() {
            window.history.back(); // Go back to previous page
        });

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

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        console.error('No movie ID found in URL parameter');
    }
});
