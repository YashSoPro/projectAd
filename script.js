$(document).ready(function() {
    console.log("Document is ready");
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';
    const searchInput = $('#search-bar input');

    function fetchMovies(page = 1) {
        console.log("Fetching movies...");
        axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
            .then(response => {
                console.log("Movies fetched successfully");
                const movies = response.data.results;
                console.log("Movies:", movies);
                displayMovies(movies);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                $('#loading-container').hide();
                $('#content').show().html('<p>Error loading movies. Please try again later.</p>');
            });
    }

    function displayMovies(movies) {
        console.log("Displaying movies...");
        const movieGrid = $('.movie-grid');
        movieGrid.empty();
        movies.forEach(movie => {
            const movieItem = `
                <div class="movie-item">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>Release Date: ${movie.release_date}</p>
                        <button class="details-btn" data-id="${movie.id}">Details</button>
                    </div>
                </div>
            `;
            movieGrid.append(movieItem);
        });
        console.log("Movies displayed");
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

    let currentPage = 1;

    $('#prevPage').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage);
        }
    });

    $('#nextPage').on('click', function() {
        currentPage++;
        fetchMovies(currentPage);
    });

    fetchMovies();
    searchInput.on('input', handleSearchInput);

    $(document).on('click', '.details-btn', function() {
        const movieId = $(this).data('id');
        window.location.href = `movie.html?id=${movieId}`;
    });
});
