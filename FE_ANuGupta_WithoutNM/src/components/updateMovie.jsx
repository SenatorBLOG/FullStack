import { useState } from "react";
const UpdateMovie = ({ onAdd = (f) => f }) => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    numberInStock: "",
    price: "",
    rating: "",
    releaseDate: "",
    like: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
    onAdd(movie);
    setMovie({
      title: "",
      director: "",
      numberInStock: "",
      price: "",
      rating: "",
      releaseDate: "",
      like: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
    //[] dynamically sets the key to the value of the name variable.
  };
  return (
    <>
      <h1>Please enter the details of the new movie here..</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title" className="p-3">
            Movie Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Enter a Title"
            value={movie.title}
            // onChange={handleChange}
            onChange={(event)=>setMovie({...movie, title:event.target.value})}
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
            value={movie.director}
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
            value={movie.numberInStock}
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
            value={movie.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="p-3">
            Movie Rating:
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
            value={movie.rating}
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
            value={movie.releaseDate}
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
            value={movie.like}
            required
            onChange={handleChange}
          />
        </div>
        <button className="m-5 p-3 w-25">ADD THE MOVIE</button>
      </form>
    </>
  );
};

export default UpdateMovie;
