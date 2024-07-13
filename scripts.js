$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';



    // Fetch featured movies
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`)
        .then(response => {
            const featuredMovies = response.data.results.slice(0, 6);
            displayMovies(featuredMovies, '#featuredMovies');
        })
        .catch(error => {
            console.error('Error fetching featured movies:', error);
        });

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

            const movieElement = $(`
                <div class="movie">
                    <img src="${imageUrl}" alt="${title}">
                    <div class="details">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <a href="movie.html?id=${movie.id}" class="btn">View Details</a>
                    </div>
                </div>
            `);
            container.append(movieElement);
        });
    }
});
