$(document).ready(function() {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';
    const searchInput = $('#search-bar input');

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

    searchInput.on('input', handleSearchInput);
});
