document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const apiKey = 'b777b72240cf94459403b7bcf3cbb5a8';

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        if (query.length > 2) {
            fetchSuggestions(query);
        } else {
            suggestions.innerHTML = '';
        }
    });

    const fetchSuggestions = (query) => {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displaySuggestions(data.results);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    };

    const displaySuggestions = (movies) => {
        suggestions.innerHTML = '';
        movies.forEach(movie => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = movie.title;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = movie.title;
                suggestions.innerHTML = '';
                // You can add additional functionality to fetch and display the selected movie details
            });
            suggestions.appendChild(suggestionItem);
        });
    };
});
