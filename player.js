$(document).ready(function() {
    const apiKey = 'cc8c9b7e031be2183ce68b254b39ddfd';
    const apiUrl = 'https://api.themoviedb.org/3';

    function fetchMovieDetails(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                const movie = response.data;
                displayMovie(movie, movieId);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function displayMovie(movie, movieId) {
        document.title = movie.title; // Set page title to movie title

        const trailerUrl = `https://vidsrc.to/embed/movie/${movieId}`;

        console.log('Trailer URL:', trailerUrl); // Debugging: Log the video URL

        const playerContainer = $('#playerContainer');
        const playerHtml = `
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <div id="trailerContainer" class="trailer-container">
                    <video controls crossori
