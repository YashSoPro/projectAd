document.addEventListener('DOMContentLoaded', function() {
    const movieGrid = document.getElementById('movie-grid');
    const apiKey = 'b777b72240cf94459403b7bcf3cbb5a8';
    let currentPage = 1;

    const fetchMovies = (query = '') => {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}&query=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Movies:', data.results);
                displayMovies(data.results);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
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
