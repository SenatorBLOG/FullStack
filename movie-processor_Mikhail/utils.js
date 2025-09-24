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

