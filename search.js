$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    $('#search-bar').on('input', function() {
        const query = $(this).val();
        if (query.length > 2) {
            fetchSuggestions(query);
        } else {
            $('#suggestions').hide();
        }
    });

    function fetchSuggestions(query) {
        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => {
                const suggestions = response.data.results;
                displaySuggestions(suggestions);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    }

    function displaySuggestions(suggestions) {
        const suggestionsList = suggestions.map(movie => `<li data-id="${movie.id}">${movie.title}</li>`).join('');
        $('#suggestions').html(suggestionsList).show();

        $('#suggestions li').on('click', function() {
            const movieId = $(this).data('id');
            window.location.href = `movie.html?id=${movieId}`;
        });
    }
});
