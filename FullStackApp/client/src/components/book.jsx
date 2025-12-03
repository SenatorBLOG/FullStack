import { FaHeart, FaRegHeart, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Book = ({ book = book, onDelete = (f) => f }) => {
  const formatPublishYear = (publishDate) => {
    return new Date(publishDate).toISOString().slice(0, 10);
  };
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.numberInStock}</td>
      <td>{book.price}</td>
      <td>{book.rating}</td>
      <td>{formatPublishYear(book.publishYear)}</td>
      <td>
        {book.like ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
      </td>
      <td>
        <Link className="nav-link" to={`/updatebook/${book._id}`}>
          <FaEdit />
        </Link>
      </td>
      <td>
        <FaTrash onClick={() => onDelete(book._id)} />
      </td>
    </tr>
  );
};

export default Book;
