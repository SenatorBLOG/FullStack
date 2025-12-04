import { useState } from "react";
const AddBook = ({ onAdd = (f) => f }) => {
  const [book, setBook] = useState({
    title: "",
    director: "",
    numberInStock: "",
    price: "",
    rating: "",
    publishYear: "",
    like: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
    onAdd(book);
    setBook({
      title: "",
      author: "",
      numberInStock: "",
      price: "",
      rating: "",
      publishYear: "",
      like: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    //[] dynamically sets the key to the value of the name variable.
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
            // onChange={handleChange}
            onChange={(event)=>setBook({...book, title:event.target.value})}
            required
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            name="director"
            id="director"
            className="form-control"
            placeholder="Enter a director"
            value={book.director}
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
          <label htmlFor="publishYear" className="p-3">
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
        <button className="m-5 p-3 w-25">ADD THE book</button>
      </form>
    </>
  );
};

export default AddBook;
