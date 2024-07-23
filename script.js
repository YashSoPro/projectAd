const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
const apiUrl = 'https://api.themoviedb.org/3';
let currentPage = 1;

function fetchMovies(page = 1, query = '') {
    const url = query
        ? `${apiUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
        : `${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`;

    axios.get(url)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies);
            currentPage = page;
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = $('#movies-container');
    moviesContainer.empty();

    movies.forEach(movie => {
        const movieHtml = `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="details">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <button class="watch-now" data-id="${movie.id}">Watch Now</button>
                </div>
            </div>
        `;
        moviesContainer.append(movieHtml);
    });

    // Attach event listener to "Watch Now" buttons
    $('.watch-now').click(function() {
        const movieId = $(this).data('id');
        window.location.href = `play.html?id=${movieId}`;
    });
}

function displayPagination() {
    const paginationHtml = `
        <button id="prevPage" class="button">Previous Page</button>
        <button id="nextPage" class="button">Next Page</button>
    `;
    $('#pagination').html(paginationHtml);

    $('#prevPage').click(function() {
        if (currentPage > 1) {
            fetchMovies(currentPage - 1);
        }
    });

    $('#nextPage').click(function() {
        fetchMovies(currentPage + 1);
    });
}

$(document).ready(function() {
    $('.hamburger').click(function() {
        $('.menu').toggleClass('active');
    });

    $('#searchForm').submit(function(e) {
        e.preventDefault();
        const query = $('#searchInput').val();
        fetchMovies(1, query);
    });

    fetchMovies();
    displayPagination();
});
