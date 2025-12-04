import {FaHeart, FaRegHeart, FaTrash,FaEdit} from "react-icons/fa"
import { Link } from "react-router-dom";

const Book = ({book, onDelete=f=>f}) => {
    return ( 
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td><img src={`/images/${book.img}`} alt={book.title} /></td>   
            <td>{book.numberInStock}</td>
            <td>{book.price}</td>
            <td>{book.rating}</td>
            <td>{Book.rating?<FaHeart color="red"/>:<FaRegHeart/>}</td>
            <td><Link to={`/updateBook/${book._id}`}><FaEdit/></Link></td>
            <td><FaTrash onClick={()=>onDelete(book._id)}/></td> 
        </tr>   
        );
}
 
export default Book;