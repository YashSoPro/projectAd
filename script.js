document.addEventListener('DOMContentLoaded', function() {
    const movieGrid = document.getElementById('movie-grid');
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890'; // Use your new API Key
    let currentPage = 1;

    const fetchMovies = (query = '') => {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}&query=${query}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Movies:', data.results);
                if (data.results && data.results.length > 0) {
                    displayMovies(data.results);
                } else {
                    movieGrid.innerHTML = '<p>No movies found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                movieGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
            });
    };

    const displayMovies = (movies) => {
        if (!movieGrid) {
            console.error('Movie grid element not found');
            return;
        }

        movieGrid.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <div class="details">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <button class="button details-button" data-id="${movie.id}">Details</button>
                </div>
            `;
            movieGrid.appendChild(movieItem);
        });

        // Add event listeners for the details buttons
        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', function() {
                const movieId = this.getAttribute('data-id');
                showMovieDetails(movieId);
            });
        });
    };

    const showMovieDetails = (movieId) => {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(movie => {
                const movieDetailsHtml = `
                    <div class="movie-details">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>
                        <button class="button watch-button" data-id="${movieId}">Watch</button>
                    </div>
                `;
                movieGrid.innerHTML = movieDetailsHtml;

                // Add event listener for the watch button
                document.querySelector('.watch-button').addEventListener('click', function() {
                    playMovie(movieId);
                });
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    };

    const playMovie = (movieId) => {
        const apiUrl = `https://vidsrc.me/api/v1/watch/${movieId}`; // Adjust to correct vidsrc endpoint if necessary

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
                    movieGrid.innerHTML = videoHtml;
                } else {
                    movieGrid.innerHTML = '<p>Video not available.</p>';
                }
            })
            .catch(error => {
                console.error('Error playing movie:', error);
                movieGrid.innerHTML = '<p>Error playing movie. Please try again later.</p>';
            });
    };

    document.getElementById('previousPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        currentPage++;
        fetchMovies();
    });

    fetchMovies();
});
