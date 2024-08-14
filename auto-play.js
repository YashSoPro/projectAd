document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('autoPlay') === 'true') {
        resumePlayback();
    }
});

// Function to save the current playback state
function savePlaybackState(movieUrl, currentTime) {
    localStorage.setItem('currentMovieUrl', movieUrl);
    localStorage.setItem('currentPlaybackTime', currentTime);
}

// Function to resume playback from saved state
function resumePlayback() {
    const movieUrl = localStorage.getItem('currentMovieUrl');
    const playbackTime = localStorage.getItem('currentPlaybackTime');

    if (movieUrl && playbackTime) {
        const player = document.querySelector('#moviePlayerFrame');

        if (player) {
            player.src = movieUrl; // Set the movie URL
            player.addEventListener('loadeddata', () => {
                player.currentTime = playbackTime; // Set the playback time
                player.play(); // Start playback
            });
        }
    }
}

// Example of saving the playback state when navigating away
// This should be called whenever you are about to leave the page or stop playback
function onPageUnload() {
    const player = document.querySelector('#moviePlayerFrame');

    if (player && player.currentTime) {
        savePlaybackState(player.src, player.currentTime);
    }
}

// Add event listener for page unload
window.addEventListener('beforeunload', onPageUnload);
