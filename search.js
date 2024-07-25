$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';
    const searchInput = $('#search-bar input');

    function fetchMovies() {
        axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => {
                const movies = response.data.results;
                displayMovies(movies);
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
            const movieItem = `
                <div class="movie-item">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div>${movie.title}</div>
                    <div>${movie.release_date}</div>
                    <div><button class="details-btn" data-id="${movie.id}">Details</button></div>
                </div>
            `;
            movieGrid.append(movieItem);
        });
        $('#loading-container').hide();
        $('#content').show();
    }

    function handleSearchInput() {
        const query = searchInput.val();
        if (query.length > 2) {
            axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
                .then(response => {
                    const suggestions = response.data.results;
                    displaySearchSuggestions(suggestions);
                })
                .catch(error => {
                    console.error('Error fetching search suggestions:', error);
                });
        } else {
            $('#suggestions').empty();
        }
    }

    function displaySearchSuggestions(suggestions) {
        const suggestionBox = $('#suggestions');
        suggestionBox.empty();
        suggestions.forEach(movie => {
            const suggestionItem = `<div class="suggestion-item" data-id="${movie.id}">${movie.title}</div>`;
            suggestionBox.append(suggestionItem);
        });

        $('.suggestion-item').on('click', function() {
            const movieId = $(this).data('id');
            window.location.href = `movie.html?id=${movieId}`;
        });
    }

    fetchMovies();
    searchInput.on('input', handleSearchInput);
});
