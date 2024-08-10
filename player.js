$(document).ready(function() {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        $('#loading-container').fadeIn(); // Show loading screen
        $.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .done(response => {
                const movie = response;
                displayMovie(movie, movieId);
                saveToRecentlyViewed(movie); // Save the movie to recently viewed
            })
            .fail(error => {
                console.error('Error fetching movie details:', error);
                $('#playerContainer').html('<p class="error-message">Failed to load movie details. Please try again later.</p>');
            })
            .always(() => {
                $('#loading-container').fadeOut(); // Hide loading screen
            });
    }

    function displayMovie(movie, movieId) {
        document.title = movie.title; // Set page title

        const playerContainer = $('#playerContainer');
        const playerHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div id="trailerContainer" class="trailer-container">
                    <iframe id="moviePlayerFrame" src="https://vidsrc.xyz/embed/movie/${movieId}" frameborder="0" allowfullscreen></iframe>
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

    function saveToRecentlyViewed(movie) {
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        
        // Remove any existing entry for this movie
        recentlyViewed = recentlyViewed.filter(item => item.id !== movie.id);
        
        // Add the new movie to the top
        recentlyViewed.unshift(movie);

        // Limit to the latest 10 viewed movies
        if (recentlyViewed.length > 10) {
            recentlyViewed.pop();
        }

        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        console.error('No movie ID found in URL parameter');
    }
});
