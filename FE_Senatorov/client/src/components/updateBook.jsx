import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const UpdateBook = ({bookToEdit, onUpdate = (f) => f }) => {
  const { id } = useParams();
  const [book, setBook] = useState(bookToEdit || {
    title: "",
    director: "",
    numberInStock: "",
    price: "",
    rating: "",
    publishYear: "",
    like: "",
  });

    useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/booksinfo/${id}`);
        const formattedBook = {
          ...data,
          releaseDate: data.releaseDate ? data.releaseDate.slice(0, 10) : "",
          like: data.like ? "true" : "false",
        };
        setBook(formattedBook);
      } catch (err) {
        console.log(`Error fetching book: ${err.message}`);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({ ...book, [name]: type === "checkbox" ? checked : value, });
    //[] dynamically sets the key to the value of the name variable.
  };
    const submitForm = (e) => {
    e.preventDefault();
        const updatedBook = {
      ...book,
      like: book.like === "true",
    };
    onUpdate(updatedBook);
  };
  return (
    <>
      <h1>Please enter the details of the new book here..</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title" className="p-3">
            Book Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Enter a Title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            placeholder="Enter a author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberInStock" className="p-3">
            Number In Stock
          </label>
          <input
            type="number"
            name="numberInStock"
            id="numberInStock"
            className="form-control"
            placeholder="Number In Stock"
            value={book.numberInStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="p-3">
            Price:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            placeholder="Enter a Price"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="p-3">
            Book Rating:
          </label>
          <input
            type="number"
            step="1"
            min="1"
            max="5"
            name="rating"
            id="rating"
            className="form-control"
            placeholder="Enter a Rating"
            value={book.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="p-3">
            Release Date:
          </label>
          <input
            type="date"
            name="releaseDate"
            id="releaseDate"
            className="form-control"
            placeholder="Enter a Release Date"
            value={book.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="like" className="p-3">
            Like Status (True/False)
          </label>
          <input
            type="text"
            name="like"
            id="like"
            className="form-control"
            placeholder="Enter the like status (True/False)"
            value={book.like}
            required
            onChange={handleChange}
          />
        </div>
        <button className="m-5 p-3 w-25">UPDATE THE BOOK</button>
      </form>
    </>
  );
};

export default UpdateBook;
