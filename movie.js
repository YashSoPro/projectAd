
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  const movieDetails = document.getElementById('movieDetails');
  const loadingContainer = document.getElementById('loading-container');

  if (!movieId) {
    loadingContainer.textContent = '❌ No movie ID provided.';
    return;
  }

  const API_KEY = 'b9777c51aea4a211a9c6f0e839934890';
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  fetch(`${BASE_URL}${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      if (!response.ok) throw new Error('❌ Movie not found.');
      return response.json();
    })
    .then(movie => {
      loadingContainer.style.display = 'none';
      movieDetails.style.display = 'block';

      movieDetails.innerHTML = `
        <div class="movie-details">
          <h1>${movie.title}</h1>
          <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" style="width:100%; max-width:300px;" />
          <div class="movie-info">
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
          </div>
          <button id="watchNowBtn" class="button">Watch Now!</button>
        </div>
      `;

      document.getElementById('watchNowBtn').addEventListener('click', function () {
        alert(`🎬 Watch link for "${movie.title}" (ID: ${movie.id}) will be here.`);
        // window.location.href = `https://your-player-url.com/play/${movie.id}`;  <- Replace this with your player link
      });
    })
    .catch(error => {
      loadingContainer.textContent = error.message;
    });
});
