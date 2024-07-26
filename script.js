const apiKey = 'b9777c51aea4a211a9c6f0e839934890'; // Replace with your actual TMDB API key

async function fetchMovies() {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const movies = response.data.results;
        console.log('Movies fetched successfully');
        console.log('Movies:', movies);
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <a href="movie.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
            </a>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

fetchMovies();
