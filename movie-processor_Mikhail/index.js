import {movies} from './movies.js';
import {createMovieObject, displayMovieSummary, findFirstHighRatedMovie, sortMoviesByRaing, logSelectedMovies} from './utils.js';

const newReleases = [
    {title: 'The Batman', year: 2022, genre: 'Action', rating: 8.3, duration: 176},
    {title: 'Dune', year: 2021, genre: 'Sci-Fi', rating: 8.1, duration: 155},
    {title: 'No Time to Die', year: 2021, genre: 'Action', rating: 7.4, duration: 163}
];


const printMovieStats = () => {
    const number = movies.length;
    console.log(number)
    const yearMovies = movies.map((moviesYear)=>moviesYear.year)
    const minYear = Math.min(...yearMovies);
    const maxYear = Math.max(...yearMovies)

    console.log(` THe dataset contains ${number} movies spanning from
        ${minYear} to ${maxYear}`);
}
printMovieStats();
findFirstHighRatedMovie(movies)
sortMoviesByRaing(movies)

movies.forEach(displayMovieSummary)
const newMovie = createMovieObject('Forest Gump',1994,'Romance',8.8,142)
const exists = movies.find(movie => movie.title == newMovie.title)
if(!exists){
    let newMovies = [...movies,newMovie]
    console.log(newMovies)
}else {
    console.log('Movie already exists')
}
//Spread operator e.i - Combine Arrays
const allMovies = [...movies, ...newReleases];
console.log(allMovies)
allMovies.forEach(displayMovieSummary)

//Spread operator e.ii - CLone the Array
const allMoviesClone = [...allMovies, newMovie];
console.log(allMoviesClone)
console.log(allMovies)

//Spread operator e.iii - Split Top and Remaining Movies with Spread
const getTopAndRemainingMovies = (movies) => {
    const sorted = [...movies].sort((a, b) => b.rating - a.rating);

    const [top1, top2, top3, ...remainingMovies] = sorted;
    const topMovies = [top1, top2, top3];

    console.log('Top 3 Movies:');
    topMovies.forEach(displayMovieSummary);

    console.log('Remaining Movies:');
    remainingMovies.forEach(displayMovieSummary);
    //Spread operator e.iv - Collect function arguments using rest parameters
    logSelectedMovies(...topMovies.map(movie => movie.title));
};

getTopAndRemainingMovies(allMovies);

// Step 3
import {addWatchedFlag,getMoviesAfter,getAverageRating,findMovie,areAllAbove,getMoviesByGenre,getLongestMovie} from './utils.js';

console.log('--- Movies with the "viewed" flag ---');
console.table(addWatchedFlag());

console.log('\n--- Movies released after 2010 ---');
console.table(getMoviesAfter(2010));

console.log('\n--- Average rating ---');
console.log(`Average rating: ${getAverageRating().toFixed(2)}`);

console.log('\n--- Find the movie "Inception" ---');
console.log(findMovie("Inception"));

console.log('\n--- Do all movies have a rating higher than 7.0? ---');
console.log(`Do all films have a rating above 7.0? ${areAllAbove(7.0)}`);

console.log('\n--- Movies in the genre of "Science Fiction" (Sci-Fi) ---');
console.table(getMoviesByGenre("Sci-Fi"));

console.log('\n--- The longest movie ---');
console.log(getLongestMovie());