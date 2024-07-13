import React from 'react';
import ReactPlayer from 'react-player';

const MoviePlayer = () => {
    return (
        <div className="movie-player">
            <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls={true} />
            {/* Add more ReactPlayer instances for other videos */}
        </div>
    );
};

export default MoviePlayer;
