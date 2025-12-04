import Movie from "./movie"
const Movies = ({movies, onDelete=f=>f}) => {

    return ( <div>
        {!movies.length?<h2>There are no movies to render</h2>
        :
        <div className="movies">
            {movies.map(movie=><Movie 
                key={movie._id}
                 movie={movie}
                 onDelete={onDelete}
                 />)}
            </div>}
    </div> );
}
 
export default Movies;