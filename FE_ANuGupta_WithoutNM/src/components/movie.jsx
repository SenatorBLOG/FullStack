import {FaHeart, FaRegHeart, FaTrash,FaEdit} from "react-icons/fa"
import { Link } from "react-router-dom";
const Movie = ({movie, onDelete=f=>f}) => {
    return (<div className="movie">
        <h2>{movie.title}</h2>
        <h3>{movie.director}</h3>
        <img src={`/images/${movie.img}`}/>
        <span>{movie.numberInStock}</span>
        <span>{movie.price}</span>
        <span>{movie.rating}</span>
        {movie.rating?<FaHeart color="red"/>:<FaRegHeart/>}
        <Link to={`/updatemovie/${movie._id}`}><FaEdit/></Link>
        <FaTrash onClick={()=>onDelete(movie._id)}/>

    </div>  );
}
 
export default Movie;