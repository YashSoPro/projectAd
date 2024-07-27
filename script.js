$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzhjOWI3ZTAzMWJlMjE4M2NlNjhiMjU0YjM5ZGRmZCIsIm5iZiI6MTcyMDg2MDAzNi45NzIxMzQsInN1YiI6IjY2OTIzYzIyNGVlNGFiYzcyNzVlODg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fohroZiX7Enow_34GHF6jGkYvR5zRFULCc-6Oh9_tXQ';
    const apiUrl = 'https://api.themoviedb.org/3';
    const vidsrcProxy = 'https://cors-anywhere.herokuapp.com/'; // Proxy for CORS issues

    // Fetch featured movies
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const featuredMovies = response.data.results.slice(0, 10);
        displayMovies(featuredMovies, '#featuredMovies');
    })
    .catch(error => {
        console.error('Error fetching featured movies:', error);
    });

    // Fetch more movies for the "Popular Movies" section
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const popularMovies = response.data.results;
        displayMovies(popularMovies, '#popularMovies');
    })
    .catch(error => {
        console.error('Error fetching popular movies:', error);
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
            const rating = movie.vote_average;

            const movieElement = $(`
                <div class="movie">
                    <img src="${imageUrl}" alt="${title}">
                    <div class="details">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <p>Rating: ${rating}/10</p>
                        <a href="movie.html?id=${movie.id}" class="plyr-trigger">View Details</a>
                    </div>
                </div>
            `);
            container.append(movieElement);
        });
    }

    // Play movie function
    function playMovie(movieId) {
        const apiUrl = `${vidsrcProxy}https://vidsrc.me/api/v1/watch/${movieId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const videoUrl = data.url; // Adjust according to vidsrc API response structure
                if (videoUrl) {
                    const videoHtml = `
                        <div id="playerContainer">
                            <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                    $('#movie-grid').html(videoHtml);
                } else {
                    $('#movie-grid').html('<p>Video not available.</p>');
                }
            })
            .catch(error => {
                console.error('Error playing movie:', error);
                $('#movie-grid').html('<p>Error playing movie. Please try again later.</p>');
            });
    }

    // Event listener for the 'Watch' button
    $(document).on('click', '.watch-btn', function() {
        const movieId = $(this).data('id');
        playMovie(movieId);
    });
});
