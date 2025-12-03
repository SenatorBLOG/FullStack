import Book from "./book";
const Books = ({ books, onDelete = (f) => f }) => {
  return (
    <div>
      {books.length === 0 ? (
        <h2>There are no books to render</h2>
      ) : (
        <>
          <h4 className="p-5">Showing {books.length} books.</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Number in Stock</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Publish Year</th>
                <th>Like</th>
                <th colSpan={2}>Action(s)</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <Book key={book._id} book={book} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Books;
