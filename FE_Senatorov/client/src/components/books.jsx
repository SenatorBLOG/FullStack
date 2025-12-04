// src/components/Books.jsx
import Book from "./book";

const Books = ({ books, onDelete = f => f }) => {
  return (
    <div>
      {!books.length ? (
        <h2>There are no books in the array</h2>
      ) : (
        <div className="books">
            <h4 className="p-5">Book Collection # {books.length}</h4>
            <table className="table">
              <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Image</th>
                    <th>Number In Stock</th>

                    <th>Price</th>
                    <th>Rating</th>
                    <th>Like</th>   
                    <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                <Book key={book._id} book={book} onDelete={onDelete}/> ))}
              </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default Books;
