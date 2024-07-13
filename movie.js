$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Fetch movie details based on ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(response => {
            const movie = response.data;
            displayMovieDetails(movie);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });

    // Function to display movie details
    function displayMovieDetails(movie) {
        const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'https://via.placeholder.com/200x300';
        const title = movie.title;
        const overview = movie.overview ? movie.overview : 'No overview available';
        const releaseDate = movie.release_date ? movie.release_date : 'Unknown';
        const rating = movie.vote_average ? movie.vote_average : 'N/A';

        $('#movieTitle').text(title);
        $('#movieOverview').text(overview);
        $('#movieReleaseDate').text(`Release Date: ${releaseDate}`);
        $('#movieRating').text(`Rating: ${rating}`);
        $('#moviePoster').attr('src', imageUrl);
    }
});
