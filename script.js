window.onload = function() {
    const loadingContainer = document.getElementById('loading-container');
    const content = document.getElementById('content');
    const movieGrid = document.getElementById('movie-grid');
    const previousPage = document.getElementById('previousPage');
    const nextPage = document.getElementById('nextPage');
    let currentPage = 1;
    const apiKey = 'b777b72240cf94459403b7bcf3cbb5a8';

    const fetchMovies = (page = 1) => {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

        loadingContainer.style.display = 'flex';
        content.style.display = 'none';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Movies:', data.results);  // Ensure movies are fetched
                displayMovies(data.results);
                loadingContainer.style.display = 'none';
                content.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                loadingContainer.style.display = 'none';
                content.style.display = 'block';
            });
    };

    const displayMovies = (movies) => {
        if (!movieGrid) {
            console.error('Movie grid element not found');
            return;
        }
        
        movieGrid.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <div class="details">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <button class="button" onclick="showDetails(${movie.id})">Details</button>
                </div>
            `;
            movieGrid.appendChild(movieItem);
        });
    };

    const showDetails = (movieId) => {
        // Function to show movie details
    };

    previousPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage);
        }
    });

    nextPage.addEventListener('click', () => {
        currentPage++;
        fetchMovies(currentPage);
    });

    fetchMovies(currentPage);
};
