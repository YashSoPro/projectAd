$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                const movie = response.data;
                displayMovie(movie, movieId);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function displayMovie(movie, movieId) {
        document.title = movie.title; // Set page title to movie title

        const trailerUrl = `https://vidsrc.to/embed/movie/${movieId}`;

        console.log('Trailer URL:', trailerUrl); // Debugging: Log the video URL

        const playerContainer = $('#playerContainer');
        const playerHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div id="trailerContainer" class="trailer-container">
                    <video controls crossorigin playsinline id="player">
                        <source src="${trailerUrl}" type="video/mp4">
                    </video>
                </div>
                <button id="backToDetailsBtn" class="button">Back to Movie Details</button>
            </div>
        `;
        playerContainer.html(playerHtml);

        $('#loading-container').fadeOut(500);
        $('#playerContainer').fadeIn(500); // Show player container after loading

        // Initialize Plyr
        const player = new Plyr('#player', {
            autoplay: true, // Ensure Plyr tries to play the video automatically
        });

        player.on('error', event => {
            console.error('Plyr Error:', event.detail.plyr.error.message);
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
