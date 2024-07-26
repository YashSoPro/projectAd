$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovies() {
        $('#loading-container').show();
        $('#content').hide();

        axios.get(`${apiUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`)
            .then(response => {
                const movies = response.data.results;
                console.log('Movies fetched successfully');
                console.log('Movies: ', movies);
                displayMovies(movies);
                $('#loading-container').hide();
                $('#content').show();
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                $('#loading-container').hide();
                $('#content').show().html('<p>Error loading movies. Please try again later.</p>');
            });
    }

    function displayMovies(movies) {
        const movieGrid = $('.movie-grid');
        movieGrid.empty();

        movies.forEach(movie => {
            const movieElement = `
                <div class="movie">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.release_date}</p>
                    <button onclick="window.location.href='movie.html?id=${movie.id}'">Details</button>
                </div>
            `;
            movieGrid.append(movieElement);
        });

        console.log('Movies displayed');
    }

    fetchMovies();
});
