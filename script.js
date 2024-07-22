const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
const apiUrl = 'https://api.themoviedb.org/3';

function fetchMovies(page = 1) {
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = $('#popularMovies');
    moviesContainer.empty();

    movies.forEach(movie => {
        const movieHtml = `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="details">
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <a href="play.html?id=${movie.id}" class="button">Watch Now</a>
                </div>
            </div>
        `;
        moviesContainer.append(movieHtml);
    });
}

$(document).ready(function() {
    fetchMovies();
});
