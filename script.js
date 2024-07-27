document.addEventListener('DOMContentLoaded', function() {
    const movieGrid = document.getElementById('movie-grid');
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890'; // Replace with your new API key
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
                </div>
            `;
            movieGrid.appendChild(movieItem);
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
