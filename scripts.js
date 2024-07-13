$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzhjOWI3ZTAzMWJlMjE4M2NlNjhiMjU0YjM5ZGRmZCIsIm5iZiI6MTcyMDg2MDAzNi45NzIxMzQsInN1YiI6IjY2OTIzYzIyNGVlNGFiYzcyNzVlODg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fohroZiX7Enow_34GHF6jGkYvR5zRFULCc-6Oh9_tXQ';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Initialize Plyr for video playback
    const player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });

    // Fetch featured movies and display on the homepage or wherever applicable
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

    // Function to display movies on the homepage or wherever applicable
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
                        <button data-id="${movie.id}" class="plyr-trigger">Play</button>
                    </div>
                </div>
            `);
            container.append(movieElement);
        });

        // Attach click event listener to each play button
        $('.plyr-trigger').on('click', function(event) {
            const movieId = $(this).data('id');
            window.location.href = `movie.html?id=${movieId}`;
        });
    };

    // Toggle navigation menu for mobile
$('#toggleNav').on('click', function() {
    $('nav').toggleClass('active');
});
});
