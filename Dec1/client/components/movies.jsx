const Movies = ({movies}) => {
    return ( <div>
            {!movies.length?<h2>THere are no movies to render</h2>
            :<div className="movies">
                {movies.map(movie=><Movie
                key={movie.id}
                    movie={movie}>
                )}};
    </div> );
}
 
export default Movies;