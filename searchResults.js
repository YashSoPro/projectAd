$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';
    let currentPage = 1; // Track current page of search results
    let totalResults = 0; // Total number of search results
    const resultsPerPage = 10; // Number of results per page

    // Function to fetch movies based on search query and page number
    function searchMovies(query, page) {
        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
            .then(response => {
                const searchResults = response.data;
                totalResults = searchResults.total_results;
                displayMovies(searchResults.results.slice(0, resultsPerPage), '#searchResultsContainer'); // Limit to resultsPerPage initially
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    // Function to display movies
    function displayMovies(movies, containerSelector) {
        const container = $(containerSelector);
        if (currentPage === 1) {
            container.empty(); // Clear container if it's the first page
        }
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

    // Function to update the "Load More" button visibility
    function updateLoadMoreButton() {
        const loadMoreBtn = $('#loadMoreBtn');
        if (currentPage * resultsPerPage < totalResults) {
            loadMoreBtn.show();
        } else {
            loadMoreBtn.hide();
        }
    }

    // Get search query from URL parameter 'query'
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    // Perform search if 'query' parameter exists
    if (query) {
        $('#searchQuery').text(`Results for: "${query}"`);
        searchMovies(query, currentPage);
    } else {
        console.error('No search query found in URL parameter');
    }

    // Load more button click event
    $('#loadMoreBtn').click(function() {
        currentPage++;
        searchMovies(query, currentPage);
    });

    // Initial load of search results
    // This is needed in case the initial search yields fewer than 10 results
    updateLoadMoreButton();
});
