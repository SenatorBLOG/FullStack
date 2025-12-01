import { useState } from "react";
const AddBook = ({ onAdd = (f) => f }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
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

  return (
    <div>
      <h1>Please enter the details of the new Book here..</h1>
      <form onSubmit={submitForm} method="post">
        <div className="form-group">
          <label htmlFor="title" className="p-3">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Enter a Title"
            onChange={(event) =>
              setBook({ ...book, title: event.target.value })
            }
            value={book.title}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="p-3">
            Book Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            placeholder="Enter an Author"
            onChange={(event) =>
              setBook({ ...book, author: event.target.value })
            }
            value={book.author}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberInStock" className="p-3">
            Number In Stock
          </label>
          <input
            type="number"
            name="numberInStock"
            id="numberInStock"
            className="form-control"
            placeholder="Number In Stock"
            onChange={(event) =>
              setBook({ ...book, numberInStock: event.target.value })
            }
            value={book.numberInStock}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="p-3">
            Book Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="form-control"
            placeholder="Enter a Price"
            onChange={(event) =>
              setBook({ ...book, price: event.target.value })
            }
            value={book.price}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating" className="p-3">
            Book Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            className="form-control"
            placeholder="Enter a Rating"
            onChange={(event) =>
              setBook({ ...book, rating: event.target.value })
            }
            value={book.rating}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishYear" className="p-3">
            Book Publish Year
          </label>
          <input
            type="date"
            name="publishYear"
            id="publishYear"
            className="form-control"
            placeholder="Enter a Publish Year"
            onChange={(event) =>
              setBook({ ...book, publishYear: event.target.value })
            }
            value={book.publishYear}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="like" className="p-3">
            Like Status (True/False)
          </label>
          <input
            type="text"
            name="like"
            id="like"
            className="form-control"
            placeholder="Enter the like status (True/False)"
            onChange={(event) => setBook({ ...book, like: event.target.value })}
            value={book.like}
            required
          />
        </div>

        <button className="m-5 p-3 w-25">ADD THE BOOK</button>
      </form>
    </div>
  );
};

export default AddBook;
