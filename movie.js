$(document).ready(function() {
    const apiKey = 'b9777c51aea4a211a9c6f0e839934890';
    const apiUrl = 'https://api.themoviedb.org/3';

    function getMovieIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        console.log(`Movie ID from URL: ${movieId}`);
        $('#debug').append(`<p>Movie ID from URL: ${movieId}</p>`); // Debugging output
        return movieId;
    }

    function fetchMovieDetails(movieId) {
        $('#debug').append(`<p>Fetching details for Movie ID: ${movieId}</p>`); // Debugging output
        axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`)
            .then(response => {
                const movie = response.data;
                displayMovieDetails(movie);
                fetchMovieTrailer(movieId);
                fetchMovieStream(movieId);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                $('#loading-container').hide();
                $('#content').show().html('<p>Error loading movie details. Please try again later.</p>');
            });
    }

    function displayMovieDetails(movie) {
        const movieDetails = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        $('#movie-details').html(movieDetails);
        $('#loading-container').hide();
        $('#content').show();
    }

    function fetchMovieTrailer(movieId) {
        axios.get(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`)
            .then(response => {
                const trailers = response.data.results;
                if (trailers.length > 0) {
                    const trailer = trailers[0];
                    $('#movie-trailer').attr('src', `https://www.youtube.com/embed/${trailer.key}`);
                    $('#trailer-container').show();
                }
            })
            .catch(error => {
                console.error('Error fetching movie trailer:', error);
            });
    }

    function fetchMovieStream(movieId) {
        const streamUrl = `https://vidsrc.to/embed/movie/${movieId}`;
        $('#movie-stream').attr('src', streamUrl);
        $('#stream-container').show();
    }

    const movieId = getMovieIdFromUrl();
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        console.log("No movie ID found in URL.");
        $('#debug').append('<p>No movie ID found in URL.</p>'); // Debugging output
        $('#loading-container').hide();
        $('#content').show().html('<p>Movie ID not found. Please try again later.</p>');
    }
});
