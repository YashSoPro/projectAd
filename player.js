a
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

        const iframe = document.getElementById('moviePlayerFrame');
        const urlParams = new URLSearchParams(window.location.search);
        const savedPosition = parseFloat(urlParams.get('position')) || 0;

        iframe.onload = () => {
            // Try to send seek position
            iframe.contentWindow.postMessage({ type: 'seek', position: savedPosition }, '*');

            // Auto-mute fallback (may not always work due to sandboxing)
            try {
                iframe.muted = true;
                iframe.setAttribute('muted', 'true');
            } catch (e) {
                console.warn('Iframe mute attempt failed:', e);
            }

            // Add black overlay for ad blocking simulation
            const overlay = document.createElement("div");
            overlay.id = "ad-block-overlay";
            overlay.style.position = "absolute";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "black";
            overlay.style.opacity = "0.85";
            overlay.style.zIndex = "9999";
            overlay.style.display = "none";
            overlay.innerHTML = "<p style='color: white; text-align:center; padding-top: 30px;'>Ad Blocked</p>";
            document.querySelector("#trailerContainer").appendChild(overlay);

            // Simulated Ad Detection
            setInterval(() => {
                const currentTime = new Date().getSeconds();
                if (currentTime % 30 < 5) {
                    overlay.style.display = "block";
                    iframe.style.filter = "brightness(0)";
                } else {
                    overlay.style.display = "none";
                    iframe.style.filter = "brightness(1)";
                }
            }, 3000);
        };

        $('#backToDetailsBtn').click(function() {
            window.history.back(); // Go back to previous page
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'F11') {
                toggleFullScreen();
            }
        });

        function toggleFullScreen() {
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
        recentlyViewed = recentlyViewed.filter(item => item.id !== movie.id);
        recentlyViewed.unshift(movie);
        if (recentlyViewed.length > 10) recentlyViewed.pop();
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }

    function saveLastViewedMovie(url, videoElement) {
        if (videoElement) {
            localStorage.setItem('lastViewedMovieURL', url);
            localStorage.setItem('playbackPosition', videoElement.currentTime);
        }
    }

    function handleAutoplay() {
        const autoplayEnabled = JSON.parse(localStorage.getItem('autoPlayEnabled'));
        if (autoplayEnabled) {
            const lastViewedMovieURL = localStorage.getItem('lastViewedMovieURL');
            const savedPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
            if (lastViewedMovieURL) {
                window.location.href = `${lastViewedMovieURL}?position=${savedPosition}`;
            }
        }
    }

    handleAutoplay();

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        console.error('No movie ID found in URL parameter');
    }
});
