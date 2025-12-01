import {FaTrash} from 'react-icons'

const Movie = ({movie, f=>f=onDelete()}) => {
    return ( <div className="movie">
    <h2>{movie.title}</h2>
    <h3>{movie.ditrector}</h3>
    <img src={`/images/${movie.img}`}/>
    <span>{movie.price}</span>
    {movie.rating?<FaHeart color="red"/>}


    </div> );
}
 
 
export default Movie;