document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTc3N2M1MWFlYTRhMjExYTljNmYwZTgzOTkzNDg5MCIsIm5iZiI6MTcyMjEwMzM3Mi41OTY2NzksInN1YiI6IjY2OTIzYzIyNGVlNGFiYzcyNzVlODg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i2AWKgJL01w3QB0-sop6hg0ImVmQbk6SVVnPlc-XBco';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Fetch and display recently viewed movies
    function displayRecentlyViewedMovies() {
        const recentViewedMovies = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        const container = document.querySelector('#recent-viewed-grid');

        if (!container) return;

        container.innerHTML = '';
        if (recentViewedMovies.length === 0) {
            container.innerHTML = '<div class="no-movies-message">No Movies watched recently</div>';
            return;
        }

        recentViewedMovies.forEach(movie => {
            const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/200x300';
            const title = movie.title;
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'No overview available';
            const rating = movie.vote_average;

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');

            movieElement.innerHTML = `
                <div class="movie-card">
                    <div class="movie-card-inner">
                        <div class="movie-card-front">
                            <img src="${imageUrl}" alt="${title}">
                        </div>
                        <div class="movie-card-back">
                            <h3>${title}</h3>
                            <p>${overview}</p>
                            <p>Rating: ${rating}/10</p>
                            <a href="play.html?id=${movie.id}" class="button">Play Now</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(movieElement);
        });
    }

    // Fetch and display now playing movies
    function fetchMovies() {
        fetch(`${apiUrl}/movie/now_playing?api_key=${apiKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const recentMovies = data.results.slice(0, 10); // Limit to 10 movies
            displayMovies(recentMovies, '#movie-grid');
        })
        .catch(error => {
            console.error('Error fetching recent movies:', error);
        });
    }

    // Function to display movies in a grid
    function displayMovies(movies, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';
        movies.forEach(movie => {
            const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/200x300';
            const title = movie.title;
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'No overview available';
            const rating = movie.vote_average;

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');

            movieElement.innerHTML = `
                <div class="movie-card">
                    <div class="movie-card-inner">
                        <div class="movie-card-front">
                            <img src="${imageUrl}" alt="${title}">
                        </div>
                        <div class="movie-card-back">
                            <h3>${title}</h3>
                            <p>${overview}</p>
                            <p>Rating: ${rating}/10</p>
                            <a href="movie.html?id=${movie.id}" class="button">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(movieElement);
        });
    }

    // Call functions
    displayRecentlyViewedMovies();
    fetchMovies();
});
