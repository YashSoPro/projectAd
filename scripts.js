$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Toggle navigation menu for mobile
    $('#toggleNav').on('click', function() {
        $('nav ul').toggleClass('active');
    });

    // Fetch more movies (adjust parameters as needed)
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}&page=1`) // Example: Fetching page 1
        .then(response => {
            const totalResults = response.data.total_results;
            const totalPages = response.data.total_pages;
            const movies = response.data.results;
            displayMovies(movies, '#featuredMovies');

            // Fetch additional pages if needed
            for (let page = 2; page <= totalPages; page++) {
                axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
                    .then(response => {
                        const moreMovies = response.data.results;
                        displayMovies(moreMovies, '#featuredMovies');
                    })
                    .catch(error => {
                        console.error(`Error fetching page ${page} movies:`, error);
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });

    // Function to display movies
    function displayMovies(movies, containerSelector) {
        const container = $(containerSelector);
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
