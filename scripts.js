$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzhjOWI3ZTAzMWJlMjE4M2NlNjhiMjU0YjM5ZGRmZCIsIm5iZiI6MTcyMDg2MDAzNi45NzIxMzQsInN1YiI6IjY2OTIzYzIyNGVlNGFiYzcyNzVlODg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fohroZiX7Enow_34GHF6jGkYvR5zRFULCc-6Oh9_tXQ';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Initialize Plyr for video playback
    const player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });

    // Fetch featured movies
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const featuredMovies = response.data.results.slice(0, 6);
        displayMovies(featuredMovies, '#featuredMovies');
    })
    .catch(error => {
        console.error('Error fetching featured movies:', error);
    });

    // Function to display movies
    function displayMovies(movies, containerSelector) {
        const container = $(containerSelector);
        container.empty();
        movies.forEach(movie => {
            const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/200x300';
            const title = movie.title;
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'No overview available';
            
            const movieElement = $(`
                <div class="movie">
                    <img src="${imageUrl}" alt="${title}">
                    <div class="details">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <button data-src="${getMovieTrailerUrl(movie.id)}" class="plyr-trigger">Play</button>
                    </div>
                </div>
            `);
            container.append(movieElement);
        });

        // Attach Plyr event listener to each play button
        $('.plyr-trigger').on('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up
            const videoSrc = $(this).attr('data-src');
            player.source = {
                type: 'video',
                sources: [
                    {
                        src: videoSrc,
                        type: 'video/mp4',
                    },
                ],
            };
            showPlayerOverlay(); // Show the player overlay
            player.play(); // Ensure Plyr's play method is called here
        });
    }

    // Function to show player overlay
    function showPlayerOverlay() {
        const playerOverlay = $('#player-overlay');
        const body = $('body');
        playerOverlay.fadeIn(); // Show the player overlay
        body.css('overflow', 'hidden'); // Disable scrolling on the body
    }

    // Close player overlay when clicking outside the overlay or on close button
    $(document).on('click', function(event) {
        const playerOverlay = $('#player-overlay');
        if (!playerOverlay.is(event.target) && playerOverlay.has(event.target).length === 0) {
            hidePlayerOverlay(); // Clicked outside the overlay, hide it
        }
    });

    // Function to hide player overlay
    function hidePlayerOverlay() {
        const playerOverlay = $('#player-overlay');
        const body = $('body');
        player.stop(); // Stop Plyr's playback
        playerOverlay.fadeOut(); // Hide the player overlay
        body.css('overflow', ''); // Re-enable scrolling on the body
    }

    // Close player overlay when clicking on close button
    $('#close-overlay').on('click', function() {
        hidePlayerOverlay(); // Hide the player overlay when close button is clicked
    });

    // Function to get movie trailer URL
    function getMovieTrailerUrl(movieId) {
        // Replace with your logic to fetch movie trailer URL
        return `https://www.youtube.com/watch?v=${movieId}`;
    }
});
