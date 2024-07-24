$(document).ready(function() {
    // Extract movie ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Fetch and display movie player
    if (movieId) {
        const movieUrl = `https://vidsrc.to/embed/movie/${movieId}`;
        $('#moviePlayerFrame').attr('src', movieUrl);
    } else {
        console.error('No movie ID found in URL parameter');
    }

    $('#loading-container').fadeOut(500);
    $('#content').fadeIn(500); // Show content container after loading
});
