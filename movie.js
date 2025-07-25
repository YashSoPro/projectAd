adocument.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  const movieDetailsContainer = document.getElementById("movieDetails");
  const loadingContainer = document.getElementById("loading-container");

  if (!movieId) {
    loadingContainer.textContent = "❌ No movie ID provided.";
    return;
  }

  fetch("movies.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("❌ Failed to load movies.json");
      }
      return response.json();
    })
    .then(movies => {
      const movie = movies.find(m => m.id == movieId);
      if (!movie) {
        loadingContainer.textContent = "❌ Movie not found.";
        return;
      }

      const html = `
        <div class="movie-details">
          <h1>${movie.title}</h1>
          <div class="trailer-container">
            <iframe src="${movie.trailer}" allowfullscreen></iframe>
          </div>
          <div class="movie-info">
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Description:</strong> ${movie.description}</p>
            <button id="watchNowBtn" class="button">Watch Now!</button>
          </div>
        </div>
      `;

      movieDetailsContainer.innerHTML = html;
      movieDetailsContainer.style.display = "block";
      loadingContainer.style.display = "none";

      // ✅ Button handler
      const watchNowBtn = document.getElementById("watchNowBtn");
      if (watchNowBtn) {
        watchNowBtn.addEventListener("click", () => {
          window.location.href = `play.html?id=${movie.id}`;
        });
      } else {
        console.warn("Watch Now button not found!");
      }
    })
    .catch(error => {
      console.error(error);
      loadingContainer.textContent = "❌ An error occurred while loading movie details.";
    });
});
