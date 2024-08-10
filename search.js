document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';
    const searchInput = document.querySelector('.navbar input[type="text"]');
    const suggestionBox = document.querySelector('.suggestion-box');
    const maxSuggestions = 5; // Limit the number of suggestions

    // Handle search input changes
    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                // Fetch movie suggestions from the API
                const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
                const data = await response.json();
                const suggestions = data.results.slice(0, maxSuggestions); // Limit results

                // Clear previous suggestions
                suggestionBox.innerHTML = '';

                // Populate suggestion box
                suggestions.forEach(movie => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = movie.title;
                    suggestionItem.dataset.movieId = movie.id; // Store movie ID

                    // Add click event for redirection
                    suggestionItem.addEventListener('click', () => {
                        window.location.href = `movie.html?id=${movie.id}`; // Redirect to movie page
                    });

                    suggestionBox.appendChild(suggestionItem);
                });

                // Show or hide the suggestion box
                suggestionBox.style.display = suggestions.length > 0 ? 'block' : 'none';
            } catch (error) {
                console.error('Error fetching movie suggestions:', error);
            }
        } else {
            suggestionBox.style.display = 'none'; // Hide suggestion box if input is empty
        }
    });

    // Hide suggestion box when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!suggestionBox.contains(event.target) && event.target !== searchInput) {
            suggestionBox.style.display = 'none';
        }
    });
});
