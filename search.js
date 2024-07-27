document.addEventListener('DOMContentLoaded', function() {
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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.results && Array.isArray(data.results)) {
                    displaySuggestions(data.results);
                } else {
                    console.error('Unexpected data structure:', data.results);
                }
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
                // Fetch and display the selected movie details
                fetchMovies(movie.title);
            });
            suggestions.appendChild(suggestionItem);
        });
    };

    // Ensure fetchMovies is defined and accessible
    function fetchMovies(query) {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&query=${query}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.results && Array.isArray(data.results)) {
                    displayMovies(data.results);
                } else {
                    console.error('Unexpected data structure:', data.results);
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    function displayMovies(movies) {
        const movieGrid = document.getElementById('movie-grid');
        if (movieGrid) {
            movieGrid.innerHTML = '';
            movies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';
                movieItem.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                    <div class="details">
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>
                    </div>
                `;
                movieGrid.appendChild(movieItem);
            });
        } else {
            console.error('Movie grid element not found');
        }
    }
});
