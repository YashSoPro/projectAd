$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';
    const moviesContainer = $('#movies');

    function fetchMovies() {
        axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`)
            .then(response => {
                const movies = response.data.results;
                displayMovies(movies);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    function displayMovies(movies) {
        const moviesHtml = movies.map(movie => `
            <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="rating">
                    <span class="stars">${getStarRating(movie.vote_average)}</span>
                    <span>${movie.vote_average.toFixed(1)}</span>
                </div>
                <h3>${movie.title}</h3>
                <a href="movie.html?id=${movie.id}" class="details-btn">Details</a>
            </div>
        `).join('');
        moviesContainer.html(moviesHtml);
    }

    function getStarRating(rating) {
        const starRating = Math.round(rating / 2);
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < starRating ? '★' : '☆';
        }
        return starsHtml;
    }

    fetchMovies();
});
