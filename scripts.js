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
        const featuredMovies = response.data.results.slice(0, 6);
        displayMovies(featuredMovies, '#featuredMovies');
    })
    .catch(error => {
        console.error('Error fetching featured movies:', error);
    });

    // Fetch popular movies
    axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const popularMovies = response.data.results.slice(0, 6);
        displayMovies(popularMovies, '#popularMovies');
    })
    .catch(error => {
        console.error('Error fetching popular movies:', error);
    });

    // Fetch popular TV shows
    axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const popularTvShows = response.data.results.slice(0, 6);
        displayMovies(popularTvShows, '#popularTvShows', true);
    })
    .catch(error => {
        console.error('Error fetching popular TV shows:', error);
    });

    // Fetch movie genres
    axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const genres = response.data.genres;
        displayGenres(genres);
    })
    .catch(error => {
        console.error('Error fetching movie genres:', error);
    });

    // Handle search form submission
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        const query = $('#searchInput').val().trim();
        if (query !== '') {
            searchMovies(query);
        }
    });

    // Function to display movies or TV shows
    function displayMovies(movies, containerSelector, isTvShow = false) {
        const container = $(containerSelector);
        container.empty();
        movies.forEach(movie => {
            const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/200x300';
            const title = isTvShow ? movie.name : movie.title;
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'No overview available';
            const mediaType = isTvShow ? 'tv' : 'movie';
            
            const movieElement = $(`
                <div class="movie">
                    <img src="${imageUrl}" alt="${title}">
                    <div class="details">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#plyrModal" data-media-type="${mediaType}" data-media-id="${movie.id}">Play</button>
                    </div>
                </div>
            `);
            container.append(movieElement);
        });
    }

    // Function to display movie genres
    function displayGenres(genres) {
        const genreList = $('#genreList');
        genres.forEach(genre => {
            const genreElement = $(`
                <li class="list-group-item" data-genre-id="${genre.id}">${genre.name}</li>
            `);
            genreList.append(genreElement);
        });
    }

    // Function to search movies
    function searchMovies(query) {
        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            const searchResults = response.data.results;
            displayMovies(searchResults, '#searchResults');
        })
        .catch(error => {
            console.error('Error searching movies:', error);
        });
    });

    // Function to handle Plyr playback
    $('#plyrModal').on('show.bs.modal', function(event) {
        const button = $(event.relatedTarget);
        const mediaId = button.data('media-id');
        const mediaType = button.data('media-type');
        playMedia(mediaId, mediaType);
    });

    function playMedia(mediaId, mediaType) {
        const videoUrl = `https://example.com/videos/${mediaId}.mp4`; // Replace with actual video URL
        const player = new Plyr('#plyrPlayer', {
            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        });
        
        const source = {
            type: 'video',
            sources: [
                {
                    src: videoUrl,
                    type: 'video/mp4',
                },
            ],
        };

        player.source = source;
        player.play();
    }
});
