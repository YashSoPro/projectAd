document.addEventListener('DOMContentLoaded', function() {
    const movieGrid = document.getElementById('movie-grid');
    const apiKey = 'b777c51aea4a211a9c6f0e839934890';
    let currentPage = 1;

    const fetchMovies = (query = '') => {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}&query=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Movies:', data.results);
                displayMovies(data.results);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
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
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <div class="details">
                    <h2>${movie.title}</h2>
                    <button class="button" onclick="showDetails('${movie.id}')">Details</button>
                </div>
            `;
            movieGrid.appendChild(movieItem);
        });
    };

    document.getElementById('previousPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        currentPage++;
        fetchMovies();
    });

   const playMovie = (movieId) => {
    // Use the CORS proxy for testing
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://vidsrc.me/api/v1/watch/${movieId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoUrl = data.url; // Adjust according to vidsrc API response structure
            if (videoUrl) {
                const videoHtml = `
                    <div id="playerContainer">
                        <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                document.getElementById('movie-grid').innerHTML = videoHtml;
            } else {
                document.getElementById('movie-grid').innerHTML = '<p>Video not available.</p>';
            }
        })
        .catch(error => {
            console.error('Error playing movie:', error);
            document.getElementById('movie-grid').innerHTML = '<p>Error playing movie. Please try again later.</p>';
        });
};


    window.showDetails = (movieId) => {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movieHtml = `
                    <div class="movie-details">
                        <h1>${data.title}</h1>
                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.title}">
                        <p>${data.overview}</p>
                        <button class="button" onclick="playMovie('${data.id}')">Watch</button>
                    </div>
                `;
                movieGrid.innerHTML = movieHtml;
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                movieGrid.innerHTML = '<p>Error fetching movie details. Please try again later.</p>';
            });
    };

    fetchMovies();
});
