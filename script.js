$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzhjOWI3ZTAzMWJlMjE4M2NlNjhiMjU0YjM5ZGRmZCIsIm5iZiI6MTcyMDg2MDAzNi45NzIxMzQsInN1YiI6IjY2OTIzYzIyNGVlNGFiYzcyNzVlODg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fohroZiX7Enow_34GHF6jGkYvR5zRFULCc-6Oh9_tXQ';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Fetch featured movies
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const featuredMovies = response.data.results.slice(0, 10);
        displayMovies(featuredMovies, '#featuredMovies');
    })
    .catch(error => {
        console.error('Error fetching featured movies:', error);
    });

    // Fetch more movies for the "Popular Movies" section
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    

    // Function to display movies
    function displayMovies(movies, containerSelector) {
        const container = $(containerSelector);
        container.empty();
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
  
  
  
  
});