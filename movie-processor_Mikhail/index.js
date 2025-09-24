import {movies} from './movies.js';
import {createMovieObject, displayMovieSummary, findFirstHighRatedMovie, sortMoviesByRaing} from './utils.js';

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

}