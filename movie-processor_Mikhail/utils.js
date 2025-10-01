export const findFirstHighRatedMovie = (movies) => {
    
    const rate = movies.find(movie => movie.rating > 8.8)
    const {title,year,rating} = rate;
    console.log(`The ${title} (${year}) 
        has an IMDb rating of ${rating.toFixed(1)}`)
}
export const sortMoviesByRaing = (movies) => {
    const sorted = movies.sort((a, b) => b.rating - a.rating);
    let[topMovie1,topMovie2,...otherTopMoies]= sorted;
    console.log(topMovie1,topMovie2,otherTopMoies)
} 
export const displayMovieSummary = ({title,year,genre}) => {
    console.log(`${title} (${year}) - Genre:${genre}`)
}
export const createMovieObject = (title,year,genre,rating,duration) => {
    let newMovie = {
        title,year,genre,rating,duration
    }
    return newMovie
}

//Spread operator e.iv - Collect function arguments using rest parameters
export const logSelectedMovies = (...movieTitles) => {
    console.log('You selected: ' + movieTitles.join(', '));
}
// Step 3 
import { movies } from './movies.js';
export const addWatchedFlag = () => {
    return movies.map(movie => ({
        ...movie,
        watched: false
    }));
};
export const getMoviesAfter = ( year) => {
    return movies.filter(movie => movie.year > year);
};
export const getAverageRating = () => {
    if (movies.length === 0) return 0;
    const totalRating = movies.reduce((sum, movie) => sum + movie.rating, 0);
    return totalRating / movies.length;
};

export const findMovie = (title) => {
    return movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());
};
export const areAllAbove = (rating) => {
    return movies.every(movie => movie.rating > rating);
};
export const getMoviesByGenre = (genre) => {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
}
export const getLongestMovie = () => {
    return movies.reduce((longest, movie) => movie.duration > longest.duration ? movie : longest, movies[0]);
}
